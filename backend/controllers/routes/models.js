const processBuildingImage = require('../lib/modelApi');

const express = require('express'),
    router = express.Router();
    fs = require("fs")
    path = require('path');

router.get('/getProcessedImages',(req,res)=>{
  const user = req.session.userId;
  const outputImgPath = path.join(__dirname,'..','..','map','output',user,req.query.image);
  try{
    if(fs.existsSync(outputImgPath)){
      res.status(200).json({processedUrl: `${req.protocol}://${req.get('host')}/map/output/${user}/${req.query.image}`})
    }else{
      res.status(200).json({})
    }
  }
  catch(e){
    console.error(e);
    res.status(501).json({error: 'Not Implemented'});
  }
 
})

router.post('/detect-buildings',async (req,res)=>{
    const user = req.session.userId;
    const userPath = path.join(__dirname,'..','..','map','output',user);
    const imageName = req.body.imageName;
    let flag;
    try {
        if (fs.existsSync(userPath)) {
          const imagePath = path.join(userPath,imageName);
          try{
              if (fs.existsSync(imagePath)){
                flag = true;
              }
              else {
                    // api get post
                flag = await processBuildingImage(user,imageName);
            }
          }
          catch(e) {
            console.log(e);
            flag = false;
          } 



        } else {
          // create folder and then
          fs.mkdirSync(path.join(__dirname,'..','..','map','output',user));
          flag = await processBuildingImage(user,imageName);
        }
      } catch(e) {
        console.log(e);
        flag = false;
      }
    flag === true?res.status(200).json({processedImageUrl: `http://13.127.219.224:3003/map/output/${user}/${imageName}`}):res.status(500).json({error: 'Work In Progress'});
})

module.exports = router;