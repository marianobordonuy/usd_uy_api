const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let galesUSD = {};
let galesARS = {};
let galesBRL = {};
let galesEUR = {};
const galesUrl = 'https://www.gales.com.uy/home/';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const galesQuotes = async() => {
    const {data} = await axios.get(galesUrl);
    const $ = cheerio.load(data);
    $('.cont_cotizaciones').each(function () {
        $('.cont_cotizaciones').each(function () {
            const source = "Gales";
            const url = galesUrl;
            const currency = "USD";
            const buy = $('tr:nth-child(1) > td:nth-child(2)', this).text();
            const sell = $('tr:nth-child(1) > td:nth-child(3)', this).text();
            const timestamp = new Date();
            galesUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
    })
    $('.cont_cotizaciones').each(function () {
        $('.cont_cotizaciones').each(function () {
            const source = "Gales";
            const url = galesUrl;
            const currency = "ARS";
            const buy = $('tr:nth-child(2) > td:nth-child(2)', this).text();
            const sell = $('tr:nth-child(2) > td:nth-child(3)', this).text();
            const timestamp = new Date();
            galesARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
    })
    $('.cont_cotizaciones').each(function () {
        $('.cont_cotizaciones').each(function () {
            const source = "Gales";
            const url = galesUrl;
            const currency = "BRL";
            const buy = $('tr:nth-child(3) > td:nth-child(2)', this).text();
            const sell = $('tr:nth-child(3) > td:nth-child(3)', this).text();
            const timestamp = new Date();
            galesBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
    })
    $('.cont_cotizaciones').each(function () {
        $('.cont_cotizaciones').each(function () {
            const source = "Gales";
            const url = galesUrl;
            const currency = "EUR";
            const buy = $('tr:nth-child(4) > td:nth-child(2)', this).text();
            const sell = $('tr:nth-child(4) > td:nth-child(3)', this).text();
            const timestamp = new Date();
            galesEUR = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_gales/', 'galesUSD.json'), JSON.stringify(galesUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for galesUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_gales/', 'galesARS.json'), JSON.stringify(galesARS, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for galesARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_gales/', 'galesBRL.json'), JSON.stringify(galesBRL, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for galesBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_gales/', 'galesEUR.json'), JSON.stringify(galesEUR, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for galesEUR");
        }
    });
    //Save data into MongoDB
    let galesDocUSD = new rateSchema(galesUSD);
    galesDocUSD.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document galesDocUSD inserted successfully!");
    });
    let galesDocARS = new rateSchema(galesARS);
    galesDocARS.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document galesDocARS inserted successfully!");
    });
    let galesDocBRL = new rateSchema(galesBRL);
    galesDocBRL.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document galesDocBRL inserted successfully!");
    });
    let galesDocEUR = new rateSchema(galesEUR);
    galesDocEUR.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document galesDocEUR inserted successfully!");
    });
    galesUSD = {};
    galesARS = {};
    galesBRL = {};
    galesEUR = {};
}

module.exports = {galesQuotes};