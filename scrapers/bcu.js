const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let bcuUSD = {};
let bcuARS = {};
let bcuBRL = {};
let bcuEUR = {};
const bcuUrl = 'http://www2.valsf.com.uy/mvdexchange/apizarradeldia.aspx';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const bcuQuotes = async() => {
    const {data} = await axios.get(bcuUrl);
    const $ = cheerio.load(data);
    $('.cotizaciones').each(function () {
        $('div:contains("BILLETE")').each(function () {
            console.log($)
            const source = "BCU";
            const url = bcuUrl;
            const currency = "USD";
            const inter = $('div > span:nth-child(2)', this).text();
            //#\32 225 > div > div > span:nth-child(2)
            //const sell = $('td.celdaventa', this).text();
            const timestamp = new Date();
            bcuUSD = ({
                source,
                url,
                currency,
                inter,
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
    fs.writeFile(path.join(__dirname, '../_data/_bcu/', 'bcuUSD.json'), JSON.stringify(bcuUSD, null, 2), err => {
        if (err) {
            myLogger.error(err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for bcuUSD");
        }
    });
    /*
    fs.writeFile(path.join(__dirname, '../_data/_val/', 'valARS.json'), JSON.stringify(valARS, null, 2), err => {
        if (err) {
            myLogger.error(err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for valARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_val/', 'valBRL.json'), JSON.stringify(valBRL, null, 2), err => {
        if (err) {
            myLogger.error(err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for valBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_val/', 'valEUR.json'), JSON.stringify(valEUR, null, 2), err => {
        if (err) {
            myLogger.error(err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for valEUR");
        }
    });
    /*
    //Save data into MongoDB
    let bcuDocUSD = new rateSchema(bcuUSD);
    bcuDocUSD.save(function(err) {
        if (err) return myLogger.error(err);
        myLogger.log(Date() + " Document bcuDocUSD inserted successfully!");
    });
     /*
    let valDocARS = new rateSchema(valARS);
    valDocARS.save(function(err) {
        if (err) return myLogger.error(err);
        myLogger.log(Date() + " Document valDocARS inserted successfully!");
    });
    let valDocBRL = new rateSchema(valBRL);
    valDocBRL.save(function(err) {
        if (err) return myLogger.error(err);
        myLogger.log(Date() + " Document valDocBRL inserted successfully!");
    });
    let valDocEUR = new rateSchema(valEUR);
    valDocEUR.save(function(err) {
        if (err) return myLogger.error(err);
        myLogger.log(Date() + " Document valDocEUR inserted successfully!");
    });


     */
    bcuUSD = {};
    //bcuARS = {};
    //bcuBRL = {};
    //bcuEUR = {};
}

module.exports = {bcuQuotes};