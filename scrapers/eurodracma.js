const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let eurodracmaUSD = {};
//let minasARS = {};
//let minasBRL = {};
//let minasEUR = {};
const eurodracmaUrl = 'https://eurodracma.com/';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const eurodracmaQuotes = async() => {
    const {data} = await axios.get(eurodracmaUrl);
    const $ = cheerio.load(data);
    $('#top-bar-wrap').each(function () {
        $('.top-bar-centered').each(function () {
            const source = "Eurodracma";
            const url = eurodracmaUrl;
            const currency = "USD";
            const buy = $('strong:nth-child(2)', this).text();
            const sell = $('strong:nth-child(2)', this).text();
            const timestamp = new Date();
            eurodracmaUSD = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_eurodracma/', 'eurodracmaUSD.json'), JSON.stringify(eurodracmaUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for eurodracmaUSD");
        }
    });
    eurodracmaUSD = {}
}

module.exports = {eurodracmaQuotes};
