const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let cambilexUSD = {};
let cambilexARS = {};
let cambilexBRL = {};
let cambilexEUR = {};
const cambilexUrl = 'https://cambilex.com.uy/';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const cambilexQuotes = async() => {
    const {data} = await axios.get(cambilexUrl);
    const $ = cheerio.load(data);
    $('.cotizaciones').each(function () {
        $('tr.cotizacion:contains("Dolares")').each(function () {
            const source = "Cambilex";
            const url = cambilexUrl;
            const currency = "USD";
            const buy = $('td.compra', this).text();
            const sell = $('td.venta', this).text();
            const timestamp = new Date();
            cambilexUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.cotizacion:contains("Argentinos")').each(function () {
            const source = "Cambilex";
            const url = cambilexUrl;
            const currency = "ARS";
            const buy = $('td.compra', this).text();
            const sell = $('td.venta', this).text();
            const timestamp = new Date();
            cambilexARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.cotizacion:contains("Reales")').each(function () {
            const source = "Cambilex";
            const url = cambilexUrl;
            const currency = "BRL";
            const buy = $('td.compra', this).text();
            const sell = $('td.venta', this).text();
            const timestamp = new Date();
            cambilexBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.cotizacion:contains("Euros")').each(function () {
            const source = "Cambilex";
            const url = cambilexUrl;
            const currency = "EUR";
            const buy = $('td.compra', this).text();
            const sell = $('td.venta', this).text();
            const timestamp = new Date();
            cambilexEUR = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
    });
    //Save data into fs
    fs.writeFile(path.join(__dirname, '../_data/_cambilex/', 'cambilexUSD.json'), JSON.stringify(cambilexUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for cambilexUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_cambilex/', 'cambilexARS.json'), JSON.stringify(cambilexARS, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for cambilexARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_cambilex/', 'cambilexBRL.json'), JSON.stringify(cambilexBRL, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for cambilexBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_cambilex/', 'cambilexEUR.json'), JSON.stringify(cambilexEUR, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for cambilexEUR");
        }
    });
    //Save data into MongoDB
    let cambilexDocUSD = new rateSchema(cambilexUSD);
    cambilexDocUSD.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document cambilexDocUSD inserted successfully!");
    });
    let cambilexDocARS = new rateSchema(cambilexARS);
    cambilexDocARS.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document cambilexDocARS inserted successfully!");
    });
    let cambilexDocBRL = new rateSchema(cambilexBRL);
    cambilexDocBRL.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document cambilexDocBRL inserted successfully!");
    });
    let cambilexDocEUR = new rateSchema(cambilexEUR);
    cambilexDocEUR.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document cambilexDocEUR inserted successfully!");
    });
    cambilexUSD = {};
    cambilexARS = {};
    cambilexBRL = {};
    cambilexEUR = {};
}

module.exports = {cambilexQuotes};