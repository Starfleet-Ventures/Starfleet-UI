const axios = require('axios').create({baseURL: "http://71.19.240.53:7007"});
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');


const getProcessedBuildingImage = async (user,imageName) => {

 return await axios.get('/getResult',{
    responseType: 'arraybuffer',
    responseEncoding: 'utf8', 
    params: {
         username: user,
         filename: imageName
     }
 }).then(response =>response).catch((err)=>err.response);
 
}
const postRawBuildingImage = async (formData) => {
 
    return await axios.post('/objectClassifier',formData,{
        responseType: 'arraybuffer',
        responseEncoding: 'utf8',
        headers: {
            ...formData.getHeaders(),
          
        },
    }).then(response =>response).catch((err)=>err.response);
    
   }
   
const processBuildingImage = async (user,imageName) =>{
    const part1 = await getProcessedBuildingImage(user,imageName);
    if(part1.status === 200){
        console.log(part1.data);
        try {
            fs.writeFileSync(path.join(__dirname,'..','..','map','output',user,imageName), Buffer.from(part1.data));
            return true;
            //file written successfully
          } catch (err) {
            console.error(err)
            return false;
          }
    }else{
       
    const form = new FormData();
    form.append('username',user);
    form.append('filename',imageName);
    form.append('image', fs.createReadStream(path.join(__dirname,'..','..','map','raw',imageName)),imageName);
    console.log(form);
    // const form ={'image': fs.createReadStream(path.join(__dirname,'..','..','map','raw',imageName))}
    const part2 = await postRawBuildingImage(form);
    if(part2.status === 200){
        console.log(part2);
        try {
            fs.writeFileSync(path.join(__dirname,'..','..','map','output',user,imageName), Buffer.from(part2.data));
            return true;
            //file written successfully
          } catch (err) {
            console.error(err)
            return false;
          }
    }
    else{
        console.log(part2.status);
        console.log("Something went Wrong");
        return false;
    }
    }
}

module.exports = processBuildingImage;