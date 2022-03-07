const express = require('express'),
    router = express.Router();
    fs = require("fs")
    path = require('path');
router.post('/detect-buildings',(req,res,next)=>{
    const user = req.session.user;
    const userPath = path.join(__dirname,'..','..','map','output',user);
    const imageName = req.body.imageName;
    try {
        if (fs.existsSync(userPath)) {
          const imagePath = path.join(userPath,imageName);
          try{
              if (fs.existsSync(imagePath)){
                res.status(200).json({processedImageUrl: `http://13.127.219.224:3003/map/output/${user}/${imageName}`})
              }
              else {
                    // api get post
            }
          }
          catch(e) {
            console.log("An error occurred.")
          } 



        } else {
          // create folder and then
          // api get post
        }
      } catch(e) {
        console.log("An error occurred.")
      }
    res.status(501).json({message: 'Work In Progress'});
})

module.exports = router;