const processImage = require('../lib/modelApi');
const LogObject = require('../utils/logs');
const express = require('express'),
    router = express.Router();
    fs = require("fs")
    path = require('path');

router.get('/getProcessedImages',(req,res)=>{
  const user = req.session.userId;
  const outputImgPath = path.join(__dirname,'..','..','map','output',user);
  let files = [];
  let logObject = new LogObject();
  logObject.path = req.originalUrl;
  try{
    
    fs.readdirSync(outputImgPath).forEach(file => {
      if(file.includes(req.query.image)){
        files.push(`https://starfleet.ventures/map/output/${user}/${file}`)
      }
    });
    res.status(200).json({processed: files}); 
  }
  catch(e){
    if(e.syscall === 'scandir' && e.errno === -2){
      logObject.message = "Expected:: when folder does not exist";
      console.log(logObject);
    }
    else{
      console.error(`Unexpected Error`);
      console.error(e);
    }
    res.status(200).json({processed: files});
  }
 
})

router.post('/detect',async (req,res)=>{
    const user = req.session.userId;
    const userPath = path.join(__dirname,'..','..','map','output',user);
    const imageName = req.body.imageName;
    const modelType = req.body.modelType;
    let flag;
    const logObject = new LogObject();
    logObject.path = req.originalUrl;
    logObject.message = req.body;
    console.log(logObject);
    try {
        if (fs.existsSync(userPath)) {
          const imagePath = path.join(userPath,`${modelType}_${imageName}`);
          logObject.message = imagePath;
          console.log(logObject);
          try{
              if (fs.existsSync(imagePath)){
                flag = true;
              }
              else {
                    // api get post
                flag = await processImage(user,imageName,modelType);
            }
          }
          catch(e) {
            console.log(e);
            flag = false;
          } 



        } else {
          // create folder and then
          fs.mkdirSync(path.join(__dirname,'..','..','map','output',user));
          flag = await processImage(user,imageName,modelType);
        }
      } catch(e) {
        logObject.message = "Unexpected Error";
        logObject.error = true;
        console.error(logObject);
        console.error(e);
        flag = false;
      }
    flag === true?res.status(200).json({processedImageUrl: `https://starfleet.ventures/map/output/${user}/${modelType}_${imageName}`}):res.status(500).json({error: 'Work In Progress'});
})

module.exports = router;