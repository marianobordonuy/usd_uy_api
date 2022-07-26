const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let maioranoUSD = {};
let maioranoARS = {};
let maioranoBRL = {};
let maioranoEUR = {};
const maioranoUrl = 'http://cambios.instyledm.com/5/cotizaciones.html';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const maioranoQuotes = async() => {
    const {data} = await axios.get(maioranoUrl);
    const $ = cheerio.load(data);
    $('body').each(function () {
        $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(3)').each(function () {
            const source = "Maiorano";
            const url = maioranoUrl;
            const currency = $('td:contains("Dolar")', this).text().replace("Dolar", "USD");
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(4)', this).text();
            const timestamp = new Date();
            maioranoUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(5)').each(function () {
            const source = "Maiorano";
            const url = maioranoUrl;
            const currency = $('td:contains("Peso")', this).text().replace("Peso", "ARS");
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(4)', this).text();
            const timestamp = new Date();
            maioranoARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(7)').each(function () {
            const source = "Maiorano";
            const url = maioranoUrl;
            const currency = $('td:contains("Real")', this).text().replace("Real", "BRL");
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(4)', this).text();
            const timestamp = new Date();
            maioranoBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(9)').each(function () {
            const source = "Maiorano";
            const url = maioranoUrl;
            const currency = $('td:contains("Euro")', this).text().replace("Euro", "EUR");
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(4)', this).text();
            const timestamp = new Date();
            maioranoEUR = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
    })
    //Save data into fs
    fs.writeFile(path.join(__dirname, '../_data/_maiorano/', 'maioranoUSD.json'), JSON.stringify(maioranoUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for maioranoUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_maiorano/', 'maioranoARS.json'), JSON.stringify(maioranoARS, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for maioranoARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_maiorano/', 'maioranoBRL.json'), JSON.stringify(maioranoBRL, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for maioranoBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_maiorano/', 'maioranoEUR.json'), JSON.stringify(maioranoEUR, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for maioranoEUR");
        }
    });
    //Save data into MongoDB
    let maioranoDocUSD = new rateSchema(maioranoUSD);
    maioranoDocUSD.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document maioranoDocUSD inserted successfully!");
    });
    let maioranoDocARS = new rateSchema(maioranoARS);
    maioranoDocARS.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document maioranoDocARS inserted successfully!");
    });
    let maioranoDocBRL = new rateSchema(maioranoBRL);
    maioranoDocBRL.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document maioranoDocBRL inserted successfully!");
    });
    let maioranoDocEUR = new rateSchema(maioranoEUR);
    maioranoDocEUR.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document maioranoDocEUR inserted successfully!");
    });
    maioranoUSD = {};
    maioranoARS = {};
    maioranoBRL = {};
    maioranoEUR = {};
}

module.exports = { maioranoQuotes }