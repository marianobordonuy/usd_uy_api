const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let brimarUSD = {};
let brimarARS = {};
let brimarBRL = {};
let brimarEUR = {};
const brimarUrl = 'https://brimar.com.uy/';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const brimarQuotes = async() => {
    const {data} = await axios.get(brimarUrl);
    const $ = cheerio.load(data);
    $('.tm-article-blog').each(function () {
        $('.tm-article-blog').each(function () {
            const source = "Brimar";
            const url = brimarUrl;
            const currency = "USD";
            const buy = $('div.tm-article-blog > article > div > p:nth-child(2)', this).text();
            const sell = $('div.tm-article-blog > article > div > p:nth-child(2)', this).text();
            const timestamp = new Date();
            brimarUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.tm-article-blog').each(function () {
            const source = "Brimar";
            const url = brimarUrl;
            const currency = "ARS";
            const buy = $('div.tm-article-blog > article > div > p:nth-child(4)', this).text();
            const sell = $('div.tm-article-blog > article > div > p:nth-child(4)', this).text();
            const timestamp = new Date();
            brimarARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.tm-article-blog').each(function () {
            const source = "Brimar";
            const url = brimarUrl;
            const currency = "BRL";
            const buy = $('div.tm-article-blog > article > div > p:nth-child(6)', this).text().charAt(0);
            const sell = $('div.tm-article-blog > article > div > p:nth-child(6)', this).text().charAt(5);
            const timestamp = new Date();
            brimarBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('.tm-article-blog').each(function () {
            const source = "Brimar";
            const url = brimarUrl;
            const currency = "EUR";
            const buy = $('div.tm-article-blog > article > div > p:nth-child(8)', this).text();
            const sell = $('div.tm-article-blog > article > div > p:nth-child(8)', this).text();
            const timestamp = new Date();
            brimarEUR = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_brimar/', 'brimarUSD.json'), JSON.stringify(brimarUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for brimarUSD");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_brimar/', 'brimarARS.json'), JSON.stringify(brimarARS, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for brimarARS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_brimar/', 'brimarBRL.json'), JSON.stringify(brimarBRL, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for brimarBRL");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_brimar/', 'brimarEUR.json'), JSON.stringify(brimarEUR, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for brimarEUR");
        }
    });
    //Save data into MongoDB
    let brimarDocUSD = new rateSchema(brimarUSD);
    brimarDocUSD.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document brimarDocUSD inserted successfully!");
    });
    let brimarDocARS = new rateSchema(brimarARS);
    brimarDocARS.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document brimarDocARS inserted successfully!");
    });
    let brimarDocBRL = new rateSchema(brimarBRL);
    brimarDocBRL.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document brimarDocBRL inserted successfully!");
    });
    let brimarDocEUR = new rateSchema(brimarEUR);
    brimarDocEUR.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document brimarDocEUR inserted successfully!");
    });
    brimarUSD = {};
    brimarARS = {};
    brimarBRL = {};
    brimarEUR = {};
}

module.exports = {brimarQuotes};