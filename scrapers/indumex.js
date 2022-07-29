//const axios = require('axios');
//const cheerio = require('cheerio');
const fs = require('fs');
//const path = require('path');
//const rateSchema = require("../models/rate");
const {Console} = require("console");

//let indumexUSD = {};
//let indumexARS = {};
//let indumexBRL = {};
//let indumexEUR = {};
//const indumexUrl = 'https://www.indumex.com/';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

/*
const indumexQuotes = async() => {
    const {data} = await axios.get(indumexUrl);
    const $ = cheerio.load(data);
    $('.rates').each(function () {
        $('.rates').each(function () {
            const source = "Indumex";
            const url = indumexUrl;
            const currency = "USD";
            const buy = $('span#compraDolar', this).text();
            const sell = $('#ventaDolar', this).text();
            const timestamp = new Date();
            indumexUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.rates .table-row:contains("ARG")').each(function () {
            const source = "Indumex";
            const url = indumexUrl;
            const currency = $('span:contains("ARG")', this).text().replace("ARG", "ARS");
            const buy = $('div:nth-child(2)', this).first().text();
            const sell = $('div:nth-child(3)', this).children('span').text();
            const timestamp = new Date();
            indumexARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.table-row:contains("REAL")').each(function () {
            const source = "Indumex";
            const url = indumexUrl;
            const currency = $('span:contains("REAL")', this).text().replace("REAL", "BRL");
            const buy = $('.table-row > div:nth-child(2) > span', this).text();
            const sell = $('.table-row > div:nth-child(3) > span', this).text();
            const timestamp = new Date();
            indumexBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.rates .div-table .table-row:contains("EURO")').each(function () {
            const source = "Indumex";
            const url = indumexUrl;
            const currency = $('span:contains("EURO")', this).text().replace("EURO", "EUR");
            const buy = $('.table-row > div:nth-child(2) > span', this).text();
            const sell = $('.table-row > div:nth-child(3) > span', this).text();
            const timestamp = new Date();
            indumexEUR = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_indumex/', 'indumexUSD.json'), JSON.stringify(indumexUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for indumexUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_indumex/', 'indumexARS.json'), JSON.stringify(indumexARS, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for indumexARS");
        }
    });
    //Save data into MongoDB
    let indumexDocUSD = new rateSchema(indumexUSD);
    indumexDocUSD.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document indumexDocUSD inserted successfully!");
    });
    indumexUSD = {};
    indumexARS = {};
    indumexBRL = {};
    indumexEUR = {};
}
*/

//module.exports = {indumexQuotes};