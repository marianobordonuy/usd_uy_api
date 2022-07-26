const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let iberiaUSD = {};
let iberiaARS = {};
let iberiaBRL = {};
let iberiaEUR = {};
const iberiaUrl = 'https://www.cambioiberia.com/';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const iberiaQuotes = async() => {
    const {data} = await axios.get(iberiaUrl);
    const $ = cheerio.load(data);
    $('ul.cotizaciones').each(function () {
        $('li:contains("Dólar")').each(function () {
            const source = "Iberia";
            const url = iberiaUrl;
            const currency = "USD";
            const buy = $('li > div:nth-child(3)', this).text();
            const sell = $('li > div:nth-child(4)', this).text();
            const timestamp = new Date();
            iberiaUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.cotizaciones li:contains("Argentino")').each(function () {
            const source = "Iberia";
            const url = iberiaUrl;
            const currency = $('div:contains("Argentino")', this).text().replace("Argentino", "ARS");
            const buy = $('li > div:nth-child(3)', this).text();
            const sell = $('li > div:nth-child(4)', this).text();
            const timestamp = new Date();
            iberiaARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.cotizaciones li:contains("Real")').each(function () {
            const source = "Iberia";
            const url = iberiaUrl;
            const currency = $('div:contains("Real")', this).text().replace("Real", "BRL");
            const buy = $('li > div:nth-child(3)', this).text();
            const sell = $('li > div:nth-child(4)', this).text();
            const timestamp = new Date();
            iberiaBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.cotizaciones li:contains("Euro")').each(function () {
            const source = "Iberia";
            const url = iberiaUrl;
            const currency = $('div:contains("Euro")', this).text().replace("Euro", "EUR");
            const buy = $('li > div:nth-child(3)', this).text();
            const sell = $('li > div:nth-child(4)', this).text();
            const timestamp = new Date();
            iberiaEUR = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_iberia', 'iberiaUSD.json'), JSON.stringify(iberiaUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for iberiaUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_iberia', 'iberiaARS.json'), JSON.stringify(iberiaARS, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for iberiaARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_iberia', 'iberiaBRL.json'), JSON.stringify(iberiaBRL, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for iberiaBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_iberia', 'iberiaEUR.json'), JSON.stringify(iberiaEUR, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for iberiaEUR");
        }
    });
    //Save data into MongoDB
    let iberiaDocUSD = new rateSchema(iberiaUSD);
    iberiaDocUSD.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document iberiaDocUSD inserted successfully!");
    });
    let iberiaDocARS = new rateSchema(iberiaARS);
    iberiaDocARS.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document iberiaDocARS inserted successfully!");
    });
    let iberiaDocBRL = new rateSchema(iberiaBRL);
    iberiaDocBRL.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document iberiaDocBRL inserted successfully!");
    });
    let iberiaDocEUR = new rateSchema(iberiaEUR);
    iberiaDocEUR.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document iberiaDocEUR inserted successfully!");
    });
    iberiaUSD = {};
    iberiaARS = {};
    iberiaBRL = {};
    iberiaEUR = {};
}

module.exports = {iberiaQuotes};