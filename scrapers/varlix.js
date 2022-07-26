const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let varlixUSD = {};
let varlixARS = {};
let varlixBRL = {};
let varlixEUR = {};
const varlixUrl = 'https://www.varlix.com.uy/';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const varlixQuotes = async() => {
    const {data} = await axios.get(varlixUrl);
    const $ = cheerio.load(data);
    //Scrap data from website
    $('.exchange').each(function () {
        $('.exchange-line:contains("Dólar")').each(function () {
            const source = "Varlix";
            const url = varlixUrl;
            const currency = $('.currency', this).text().replace("Dólar Americano", "USD");
            const buy = $('.buy', this).text();
            const sell = $('.sell', this).text();
            const timestamp = new Date();
            varlixUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        })
    })
    $('.exchange-line:contains("Peso")').each(function () {
        const source = "Varlix";
        const url = varlixUrl;
        const currency = $('.currency', this).text().replace("Peso Argentino", "ARS");
        const buy = $('.buy', this).text();
        const sell = $('.sell', this).text();
        const timestamp = new Date();
        varlixARS = ({
            source,
            url,
            currency,
            buy,
            sell,
            timestamp
        })
    });
    $('.exchange-line:contains("Real")').each(function () {
        const source = "Varlix";
        const url = varlixUrl;
        const currency = $('.currency', this).text().replace("Real", "BRL");
        const buy = $('.buy', this).text();
        const sell = $('.sell', this).text();
        const timestamp = new Date();
        varlixBRL = ({
            source,
            url,
            currency,
            buy,
            sell,
            timestamp
        })
    });
    $('.exchange-line:contains("Euro")').each(function () {
        const source = "Varlix";
        const url = varlixUrl;
        const currency = $('.currency', this).text().replace("Euro", "EUR");
        const buy = $('.buy', this).text();
        const sell = $('.sell', this).text();
        const timestamp = new Date();
        varlixEUR = ({
            source,
            url,
            currency,
            buy,
            sell,
            timestamp
        })
    });
    //Save data into fs
    fs.writeFile(path.join(__dirname, '../_data/_varlix/', 'varlixUSD.json'), JSON.stringify(varlixUSD, this, 2), err => {
        if (err) {
            myLogger.error(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for varlixUSD on FS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_varlix/', 'varlixARS.json'), JSON.stringify(varlixARS, this, 2), err => {
        if (err) {
            myLogger.error(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for varlixARS on FS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_varlix/', 'varlixBRL.json'), JSON.stringify(varlixBRL, this, 2), err => {
        if (err) {
            myLogger.error(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for varlixBRL on FS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_varlix/', 'varlixEUR.json'), JSON.stringify(varlixEUR, this, 2), err => {
        if (err) {
            myLogger.error(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for varlixEUR on FS");
        }
    });
    //Save data into MongoDB
    let varlixDocUSD = new rateSchema(varlixUSD);
    varlixDocUSD.save(function(err) {
        if (err) {
            return myLogger.error(Date() + " " + err);
        } else {
            myLogger.log(Date() + " Document varlixDocUSD inserted successfully on MongoDB!");
        }
    });
    //Save data into MongoDB
    let varlixDocARS = new rateSchema(varlixARS);
    varlixDocARS.save(function(err) {
        if (err) {
            return myLogger.error(Date() + " " + err);
        } else {
            myLogger.log(Date() + " Document varlixDocARS inserted successfully on MongoDB!");
        }
    });
    //Save data into MongoDB
    let varlixDocBRL = new rateSchema(varlixBRL);
    varlixDocBRL.save(function(err) {
        if (err) {
            return myLogger.error(Date() + " " + err);
        } else {
            myLogger.log(Date() + " Document varlixDocBRL inserted successfully on MongoDB!");
        }
    });
    //Save data into MongoDB
    let varlixDocEUR = new rateSchema(varlixEUR);
    varlixDocEUR.save(function(err) {
        if (err) {
            return myLogger.error(Date() + " " + err);
        } else {
            myLogger.log(Date() + " Document varlixDocEUR inserted successfully on MongoDB!");
        }
    });
    varlixUSD = {};
    varlixARS = {};
    varlixBRL = {};
    varlixEUR = {};
};

module.exports = {varlixQuotes};
