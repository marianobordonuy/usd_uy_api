const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const rateSchema = require("../models/rate");
const {Console} = require("console");

let balumaUSD = {};
//let avenidaARS = {};
//let avenidaBRL = {};
//let avenidaEUR = {};
const balumaUrl = 'http://balumacambio.enjoypuntadeleste.com.uy/cotizacion.php';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

const balumaQuotes = async() => {
    const {data} = await axios.get(balumaUrl);
    const $ = cheerio.load(data);
    $('body').each(function () {
        $('table').each(function () {
            const source = "Baluma";
            const url = balumaUrl;
            const currency = "USD";
            const buy = $('tr:contains("USA") > font', this).text();
            //body > table > tbody > tr:nth-child(1) > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            //body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            //body > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(3) > font
            const sell = $('tbody > tr > td:nth-child(1) > table > tbody > tr > td > table > tbody > tr:nth-child(4) > font', this).text();
            const timestamp = new Date();
            balumaUSD = ({
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
    fs.writeFile(path.join(__dirname, '../_data/_baluma/', 'balumaUSD.json'), JSON.stringify(balumaUSD, null, 2), err => {
        if (err) {
            myLogger.log(Date() + " " + err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for balumaUSD");
        }
    });
    /*
    //Save data into MongoDB
    let balumaDocUSD = new rateSchema(balumaUSD);
    balumaDocUSD.save(function(err) {
        if (err) return myLogger.log(Date() + " " + err);
        myLogger.log(Date() + " Document balumaDocUSD inserted successfully!");
    });
     */
    balumaUSD = {};
}

module.exports = {balumaQuotes};