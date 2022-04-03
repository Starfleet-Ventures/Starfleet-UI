const processImage = require('../lib/modelApi');

const express = require('express'),
    router = express.Router();
    fs = require("fs")
    path = require('path');

router.get('/getProcessedImages',(req,res)=>{
  const user = req.session.userId;
  const outputImgPath = path.join(__dirname,'..','..','map','output',user);
  let files = [];
  try{
    
    fs.readdirSync(outputImgPath).forEach(file => {
      if(file.includes(req.query.image)){
        files.push(`http://13.127.219.224/map/output/${user}/${file}`)
      }
    });
    res.status(200).json({processed: files}); 
  }
  catch(e){
    console.error(e);
    res.status(200).json({processed: files});
  }
 
})

router.post('/detect',async (req,res)=>{
    const user = req.session.userId;
    const userPath = path.join(__dirname,'..','..','map','output',user);
    console.log(req.body);
    const imageName = req.body.imageName;
    const modelType = req.body.modelType;
    let flag;
    try {
        if (fs.existsSync(userPath)) {
          const imagePath = path.join(userPath,`${modelType}_${imageName}`);
          console.log(imagePath);
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
        console.log(e);
        flag = false;
      }
    flag === true?res.status(200).json({processedImageUrl: `http://13.127.219.224/map/output/${user}/${modelType}_${imageName}`}):res.status(500).json({error: 'Work In Progress'});
})

module.exports = router;