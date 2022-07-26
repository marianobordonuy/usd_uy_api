const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let bacacayUSD = {};
let bacacayARS = {};
let bacacayBRL = {};
let bacacayEUR = {};
const bacacayUrl = 'https://bacacaysf.com/cotizaciones.php';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const bacacayQuotes = async() => {
    const {data} = await axios.get(bacacayUrl);
    const $ = cheerio.load(data);
    //Scrap data from website
    $('body > div > div.wrap-ser-cliente > div > table > tbody > tr > td:nth-child(1) > table > tbody').each(function () {
        $('tr:contains("Dolar USA"):nth-child(1)').each(function () {
            const source = "Bacacay";
            const url = bacacayUrl;
            const currency = "USD";
            const buy = $('td:nth-child(3)', this).first().text();
            const sell = $('td:nth-child(3)', this).first().next().text();
            const timestamp = new Date();
            bacacayUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        }),
        $('tr:nth-child(4):contains("Peso Argentino")').each(function () {
            const source = "Bacacay";
            const url = bacacayUrl;
            //body > div > div.wrap-ser-cliente > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(4)
            const currency = "ARS";
            const buy = $('td:nth-child(3)', this).first().text();
            //body > div > div.wrap-ser-cliente > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(3)
            const sell = $('td:nth-child(3)', this).first().next().text();
            const timestamp = new Date();
            bacacayARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        }),
        $('tr:nth-child(5):contains("Real")').each(function () {
            const source = "Bacacay";
            const url = bacacayUrl;
            const currency = "BRL";
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(3)', this).first().next().text();
            const timestamp = new Date();
            bacacayBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        }),
        $('tr:nth-child(3):contains("Euro")').each(function () {
            const source = "Bacacay";
            const url = bacacayUrl;
            const currency = "EUR";
            const buy = $('td:nth-child(3)', this).text();
            const sell = $('td:nth-child(3)', this).first().next().text();
            const timestamp = new Date();
            bacacayEUR = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_bacacay/', 'bacacayUSD.json'), JSON.stringify(bacacayUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for bacacayUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_bacacay/', 'bacacayARS.json'), JSON.stringify(bacacayARS, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for bacacayARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_bacacay/', 'bacacayBRL.json'), JSON.stringify(bacacayBRL, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for bacacayBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_bacacay/', 'bacacayEUR.json'), JSON.stringify(bacacayEUR, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for bacacayEUR");
        }
    });
    //Save data into MongoDB
    let bacacayDocUSD = new rateSchema(bacacayUSD);
    bacacayDocUSD.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document bacacayDocUSD inserted successfully!");
    });
    let bacacayDocARS = new rateSchema(bacacayARS);
    bacacayDocARS.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document bacacayDocARS inserted successfully!");
    });
    let bacacayDocBRL = new rateSchema(bacacayBRL);
    bacacayDocBRL.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document bacacayDocBRL inserted successfully!");
    });
    let bacacayDocEUR = new rateSchema(bacacayEUR);
    bacacayDocEUR.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document bacacayDocEUR inserted successfully!");
    });
    bacacayUSD = {};
    bacacayARS = {};
    bacacayBRL = {};
    bacacayEUR = {};
}

module.exports = {bacacayQuotes};