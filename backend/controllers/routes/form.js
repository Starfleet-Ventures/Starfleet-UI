const express = require('express'),
    router = express.Router();
    upload = require('../lib/multer'),
    nodemailer = require('nodemailer');
const cclist = require('../../config/countries-and-phone-codes.json');
const DemoFormModel = require('../../models/DemoForm');

const transporter = nodemailer.createTransport({
    service: 'gmail',
      auth: {
        user: 'ishansharma1320@gmail.com',
        pass: 'sdsdzsyrpjazmyxf'
      }
    });



const demoMail = (name, email, message)=>{ 
    console.log(name, email, message);
    var mailOptions = {
        from: '"Starfleet" <ishansharma1320@gmail.com>',
        to: 'bizdev@starfleet-ventures.com',
        bcc: ['ishan@yactraq.net'],
        subject: `Starfleet:: Demo Form Requested By ${name}`,
        html: `Hi, <br><br>
        Please find attached the user details for Demo Request for Starfleet<br><br>
        Name: ${name}<br>
        Email: ${email}<br>
        Message: ${message}<br><br><br>

        ----------------<br>
        Thanks & Regards,<br>
        Ishan Sharma<br>
        `

    };
    
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.error(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    };    
router.post('/postDemoForm',upload.none(),async (req,res)=>{
    const obj = req.body;
    console.log(req.body);
    let demoFormObj = new DemoFormModel(obj);
    
    await demoFormObj.save();
    demoMail(req.body.name,req.body.email,req.body.message);
    res.status(200).json({message:"Success"});
    })
router.get('/getCountriesInfo', (req,res)=>{
        res.status(200).json({response:cclist,count: cclist.length});
    });

module.exports = router;