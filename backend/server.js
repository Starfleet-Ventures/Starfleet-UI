const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const cclist = require('./config/countries-and-phone-codes');
const config = require('./config/database');

const filePath = path.join(__dirname, '..','dist','starfleet');

const dev = config.development;
const PORT = dev.port;

mongoose.connect('mongodb://'+ dev.username + ':' + dev.password + '@' + dev.host + '/' + dev.db)
.then(()=>{
  console.log("Connected to Database");
}).catch(()=>{
  console.error("Could not Connect to Database");
});

const app = express();
app.use(express.static(filePath));

app.get('/getCountriesInfo', (req,res)=>{
    res.status(200).json({response:cclist,count: cclist.length});
});
app.listen(PORT, function () {
    console.log('server started at port : '+PORT);
});

