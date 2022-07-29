const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
//const rateSchema = require("../models/rate");
const {Console} = require("console");

let velsoUSD = {};
let velsoARS = {};
let velsoBRL = {};
let velsoEUR = {};
const velsoUrl = 'https://cambiovelso.com.uy/';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const velsoQuotes = async() => {
    const {data} = await axios.get(velsoUrl);
    const $ = cheerio.load(data);
    $('table.tablepress').each(function () {
        $('tr.row-2').each(function () {
            const source = "Velso";
            const url = velsoUrl;
            const currency = "USD";
            const buy = $('td.column-2', this).text();
            const sell = $('td.column-3', this).text();
            const timestamp = new Date();
            velsoUSD = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.row-5').each(function () {
            const source = "Velso";
            const url = velsoUrl;
            const currency = "ARS";
            const buy = $('td.column-2', this).text();
            const sell = $('td.column-3', this).text();
            const timestamp = new Date();
            velsoARS = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.row-4').each(function () {
            const source = "Velso";
            const url = velsoUrl;
            const currency = "ARS";
            const buy = $('td.column-2', this).text();
            const sell = $('td.column-3', this).text();
            const timestamp = new Date();
            velsoBRL = ({
                source,
                url,
                currency,
                buy,
                sell,
                timestamp
            })
        });
        $('tr.row-3').each(function () {
            const source = "Velso";
            const url = velsoUrl;
            const currency = "ARS";
            const buy = $('td.column-2', this).text();
            const sell = $('td.column-3', this).text();
            const timestamp = new Date();
            velsoEUR = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_velso/', 'velsoUSD.json'), JSON.stringify(velsoUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for velsoUSD on FS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_velso/', 'velsoARS.json'), JSON.stringify(velsoARS, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for velsoARS on FS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_velso/', 'velsoBRL.json'), JSON.stringify(velsoBRL, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for velsoBRL on FS");
        }
    });
    fs.writeFile(path.join(__dirname, '../_data/_velso/', 'velsoEUR.json'), JSON.stringify(velsoEUR, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for velsoEUR on FS");
        }
    });
    /*
    //Save data into MongoDB
    let velsoDocUSD = new rateSchema(velsoUSD);
    velsoDocUSD.save(function(err) {
        if (err) {
            return myLogger.log(Date() + " " + err);
        } else {
        myLogger.log(Date() + " Document velsoDocUSD inserted successfully on MongoDB!");
        }
    });
    let velsoDocARS = new rateSchema(velsoARS);
    velsoDocARS.save(function(err) {
        if (err) {
            return myLogger.error(Date() + " " + err);
        } else {
            myLogger.log(Date() + " Document velsoDocARS inserted successfully on MongoDB!");
        }
    });
    let velsoDocBRL = new rateSchema(velsoBRL);
    velsoDocBRL.save(function(err) {
        if (err) {
            return myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " Document velsoDocBRL inserted successfully on MongoDB!");
        }
    });
    let velsoDocEUR = new rateSchema(velsoEUR);
    velsoDocEUR.save(function(err) {
        if (err) {
            return myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " Document velsoDocEUR inserted successfully on MongoDB!");
        }
    });
    */
    velsoUSD = {};
    velsoARS = {};
    velsoBRL = {};
    velsoEUR = {};
}

module.exports = {velsoQuotes};