const express = require('express'),
    router = express.Router();
    upload = require('../lib/multer');
const cclist = require('../../config/countries-and-phone-codes.json');
const DemoFormModel = require('../../models/DemoForm');

router.post('/postDemoForm',upload.none(),async (req,res)=>{
    const obj = req.body;
    let demoFormObj = new DemoFormModel(obj);
    
    await demoFormObj.save();
    
    res.status(200).json({message:"Success"});
    })
router.get('/getCountriesInfo', (req,res)=>{
        res.status(200).json({response:cclist,count: cclist.length});
    });

module.exports = router;