const PORT = process.env.PORT || 8000
const express = require('express');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
//const mongoose = require('mongoose');
const { Console } = require('console');
const Aeromar = require('./scrapers/aeromar');
const Aspen = require ('./scrapers/aspen');
//const Avenida = require('./scrapers/avenida');
const Bacacay = require('./scrapers/bacacay');
//const Baluma = require('./scrapers/baluma');
//const BCU = require('./scrapers/bcu')
//const Brimar =require('./scrapers/brimar');
const Cambilex = require('./scrapers/cambilex');
const Delta = require('./scrapers/delta');
const Dieciocho =require('./scrapers/dieciocho');
//const Eurodracma = require('./scrapers/eurodracma');
const Gales = require('./scrapers/gales');
const Iberia = require('./scrapers/iberia');
//const Indumex = require('./scrapers/indumex');
const Maiorano = require ('./scrapers/maiorano');
const Minas = require('./scrapers/minas');
//const Sir = require('./scrapers/sir');
const Val = require('./scrapers/val');
const Varlix = require ('./scrapers/varlix');
const Velso = require('./scrapers/velso');
const rateSchema = require("./models/rate");
require('dotenv').config();

//const uri = process.env.MONGODB_URI;

const index = express()

index.use(express.urlencoded({extended: true}));
index.use(express.json());

const myLogger = new Console({
    stdout: fs.createWriteStream("./_logs/normalStdout.txt"),
    stderr: fs.createWriteStream("./_logs/errStdErr.txt"),
});

/*
try {
    mongoose.connect(
        //uri,
        "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.SECRET_KEY + "@" + process.env.DB_NAME + ".wbidg.mongodb.net/" + process.env.DB_COLLECTION +"?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        },
        () => myLogger.log(Date() + " Mongoose is connected")
    );
} catch (err) {
    myLogger.error(Date() + " Could not connect " + err)
}
*/

index.get('/', (req, res) => {
    res.json('UYU.EXCHANGE API to get the current rates for the UYU (Peso) against other main currencies offered in Punta del Este - Uruguay in USD, ARS, BRL and EUR.' +
        'You can select the exchange and the currency by placing /api/exchange(from list below)/currency(from list below)/)' +
        'Exchanges available: aeromar, aspen, avenida, bacacay, baluma, brimar, cambilex, delta, dieciocho, eurodracma, gales, iberia, indumex, maiorano, minas, sir, val, varlix, velso' +
        'Currencies available: USD, ARS, BRL, EUR')
})

//GET request to obtain rate for a given exchange and currency
index.get('/api/:sourceId/:currencyId', async (req, res) => {
    let source = req.params.sourceId;
    let currency = req.params.currencyId;
    const filePath = path.join(__dirname,'./_data/_' + source + '/', source + currency + '.json');
    //Read file and displays the response
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            res.writeHead(200, {'Content-Type': 'json'});
            res.write(data);
            res.end();
        } else {
            myLogger.error(Date() + " " + err);
        }
    });
})

//GET request to obtain logs details
index.get('/logs/:logId', async (req, res) => {
    let log = req.params.logId;
    const filePath = path.join(__dirname,'./_logs/' + log + '.txt');
    //Read file and displays
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(data);
            res.end();
        } else {
            myLogger.error(Date() + " " + err);
        }
    });
})

//POST request to save exchange rates from other websites
index.post('/save/:sourceId/:currencyId', async (req, res) => {
    const source = req.params.sourceId;
    const currency = req.params.currencyId;
    const newRate = new rateSchema(req.body);
    //Save data in FS
    fs.writeFile(path.join(__dirname, './_data/_' + source + '/', source + currency + '.json'), JSON.stringify(newRate, null, 2), err => {
        if (!err) {
            res.status(200).send();
            myLogger.log(Date() + " JSON file successfully created in FS for " + source + currency);
        } else {
            myLogger.error(Date() + " " + err);
        }
    });
    /*
    //Save data in MongoDB
    let newDocRate = new rateSchema(newRate);
    await newDocRate.save(function(err) {
        if (!err) {
            myLogger.log(Date() + " JSON file successfully stored in Mongo for " + source + currency);
        } else {
            myLogger.error(Date() + " " + err);
        }
    });
    */
})


cron.schedule('1,16,31,46 10-20 * * *', () => {
    void Aeromar.aeromarQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 1,16,31,46 10-20 * * *', () => {
    void Aspen.aspenQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

/*
//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Avenida.avenidaQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});
*/

//Cron job to refresh the rates every 15 minutes
cron.schedule('2,17,32,47 10-20 * * *', () => {
    void Bacacay.bacacayQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

/*
//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Baluma.balumaQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});
*/

/*
//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Bcu.bcuQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});
*/

/*
//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Brimar.brimarQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});
*/

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 2,17,32,47 10-20 * * *', () => {
    void Cambilex.cambilexQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('3,18,33,48 10-20 * * *', () => {
    void Delta.deltaQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 3,18,33,48 10-20 * * *', () => {
    void Dieciocho.dieciochoQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

/*
//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Eurodracma.eurodracmaQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});
*/

//Cron job to refresh the rates every 15 minutes
cron.schedule('4,19,34,49 10-20 * * *', () => {
    void Gales.galesQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 4,19,34,49 10-20 * * *', () => {
    void Iberia.iberiaQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

/*
//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Indumex.indumexQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});
*/

//Cron job to refresh the rates every 15 minutes
cron.schedule('5,20,35,50 10-20 * * *', () => {
    void Maiorano.maioranoQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});


//Cron job to refresh the rates every 15 minutes
cron.schedule('30 5,20,35,50 10-20 * * *', () => {
    void Minas.minasQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

/*
//Cron job to refresh the rates every 15 minutes
cron.schedule('* * * * *', () => {
    void Sir.sirQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});
*/

//Cron job to refresh the rates every 15 minutes
cron.schedule('6,21,36,51 10-20 * * *', () => {
    void Val.valQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('30 6,21,36,51 10-20 * * *', () => {
    void Varlix.varlixQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

//Cron job to refresh the rates every 15 minutes
cron.schedule('7,22,37,52 10-20 * * *', () => {
    void Velso.velsoQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});

index.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

module.exports = index;