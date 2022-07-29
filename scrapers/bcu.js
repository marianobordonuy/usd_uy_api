//const axios = require('axios');
//const cheerio = require('cheerio');
const fs = require('fs');
//const path = require('path');
//const rateSchema = require("../models/rate");
const {Console} = require("console");

//let bcuUSD = {};
//const bcuUrl = 'http://www2.valsf.com.uy/mvdexchange/apizarradeldia.aspx';

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

/*
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
    })
    //Save data into fs
    fs.writeFile(path.join(__dirname, '../_data/_bcu/', 'bcuUSD.json'), JSON.stringify(bcuUSD, null, 2), err => {
        if (err) {
            myLogger.error(err);
        } else {
            myLogger.log(Date() + " JSON file successfully created for bcuUSD");
        }
    });
    //Save data into MongoDB
    let bcuDocUSD = new rateSchema(bcuUSD);
    bcuDocUSD.save(function(err) {
        if (err) return myLogger.error(err);
        myLogger.log(Date() + " Document bcuDocUSD inserted successfully!");
    });
    bcuUSD = {};
}
*/

//module.exports = {bcuQuotes};