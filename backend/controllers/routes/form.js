const express = require('express'),
    router = express.Router();
    upload = require('../lib/multer'),
    nodemailer = require('nodemailer');
const cclist = require('../../config/countries-and-phone-codes.json');
const DemoFormModel = require('../../models/DemoForm');

const transporter = nodemailer.createTransport({
    /*  service: 'gmail',
      auth: {
        user: 'yactraqservices@gmail.com',
        pass: 'yactraq000@'
      }
    */
    
    service: 'yactraq',
    host: "mail.hover.com",
    //secureConnection: true,
    port: 587,
    auth: {
    user: 'ishan@yactraq.net',
    pass: 'Shar@13-02'
    }
    });



const demoMail = (name, email, message)=>{ 
    console.log(name, email, message);
    var mailOptions = {
        from: '"Starfleet" <ishan@yactraq.net>',
        to: 'bizdev@starfleet-ventures.com',
        bcc: ['ishan@yactraq.net'],
        subject: `Starfleet:: Demo Form Requested By ${name}`,
        html: `Name: ${name}
               Email: ${email}
               Message: ${message}
        `

    };
    
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    };    
router.post('/postDemoForm',upload.none(),async (req,res)=>{
    const obj = req.body;
    let demoFormObj = new DemoFormModel(obj);
    
    await demoFormObj.save();
    demoMail(req.body.name,req.body.email,req.body.message);
    res.status(200).json({message:"Success"});
    })
router.get('/getCountriesInfo', (req,res)=>{
        res.status(200).json({response:cclist,count: cclist.length});
    });

module.exports = router;