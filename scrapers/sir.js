const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let sirUSD = {};
let sirARS = {};
let sirBRL = {};
let sirEUR = {};
const sirUrl = 'https://www.cambiosir.com.uy/';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const sirQuotes = async() => {
    const {data} = await axios.get(sirUrl);
    const $ = cheerio.load(data);
    $('table#theTable').each(function () {
        $('table#theTable').each(function () {
            const source = "Sir";
            const url = sirUrl;
            const currency = "USD";
            const buy = $('body > tr:nth-child(1) > td:nth-child(2)', this).text();
            const sell = $('tr:nth-child(1) > td:nth-child(2)', this).next().text();
            const timestamp = new Date();
            sirUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        /*
        $('.mod-cotizacion').each(function () {
            const source = "Val";
            const url = valUrl;
            const currency = "ARS";
            const buy = $('div.row > div.col-xs-4:nth-child(2) > p:nth-child(3)', this).text();
            const sell = $('div.row > div.col-xs-4:nth-child(3) > p:nth-child(3)', this).text();
            const timestamp = new Date();
            valARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.mod-cotizacion').each(function () {
            const source = "Val";
            const url = valUrl;
            const currency = "BRL";
            const buy = $('div.row > div.col-xs-4:nth-child(2) > p:nth-child(4)', this).text();
            const sell = $('div.row > div.col-xs-4:nth-child(3) > p:nth-child(4)', this).text();
            const timestamp = new Date();
            valBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.mod-cotizacion').each(function () {
            const source = "Val";
            const url = valUrl;
            const currency = "EUR";
            const buy = $('div.row > div.col-xs-4:nth-child(2) > p:nth-child(5)', this).text();
            const sell = $('div.row > div.col-xs-4:nth-child(3) > p:nth-child(5)', this).text();
            const timestamp = new Date();
            valEUR = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });

         */
    })
    //Save data into fs
    fs.writeFile(path.join(__dirname, '../_data/_sir/', 'sirUSD.json'), JSON.stringify(sirUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for sirUSD");
        }
    });
    /*
    fs.writeFile(path.join(__dirname, '../_data/_val/', 'valARS.json'), JSON.stringify(valARS, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for valARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_val/', 'valBRL.json'), JSON.stringify(valBRL, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for valBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_val/', 'valEUR.json'), JSON.stringify(valEUR, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for valEUR");
        }
    });

     */
    //Save data into MongoDB
    let sirDocUSD = new rateSchema(sirUSD);
    sirDocUSD.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document sirDocUSD inserted successfully!");
    });
    /*
    let valDocARS = new rateSchema(valARS);
    valDocARS.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document valDocARS inserted successfully!");
    });
    let valDocBRL = new rateSchema(valBRL);
    valDocBRL.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document valDocBRL inserted successfully!");
    });
    let valDocEUR = new rateSchema(valEUR);
    valDocEUR.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document valDocEUR inserted successfully!");
    });

     */
    sirUSD = {};
    //sirARS = {};
    //sirBRL = {};
    //sirEUR = {};
}

module.exports = {sirQuotes};