const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer  = require('multer');


const DemoFormModel = require('./models/DemoForm');
const UserModel = require('./models/User');

const cclist = require('./config/countries-and-phone-codes');
const config = require('./config/database');

const filePath = path.join(__dirname, '..','dist','starfleet');

const dev = config.development;
const PORT = dev.port;
const upload = multer();
const MONGO_URI = 'mongodb://'+ dev.username + ':' + dev.password + '@' + dev.host + '/' + dev.db
mongoose.connect(MONGO_URI,{
  useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>{
  console.log("Connected to Database");
}).catch(()=>{
  console.error("Could not Connect to Database");
});
const store = MongoDBSession({
  uri: MONGO_URI,
  collection: 'SFSessions',
})
const app = express();
app.use(session({
  secret: 'abcjajajb',
  resave: false,
  saveUninitialized: false,
  store: store
}));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const isAuth = (req,res,next) =>{
  if(req.session.isAuth){
      next();
  }else{
      res.redirect('/');
  }

}



app.use(express.static(filePath));
app.get('/map',isAuth,(req,res)=>{
  res.sendFile(path.join(__dirname,'..','dist','starfleet','index.html'));
})
app.post("/register",upload.none(),async (req,res)=>{
  const {username,email,password}=req.body;
  let user = await UserModel.findOne({username});
  if (user){
      return res.status(401).json({message: "User Already Exists",target: undefined});
  }
  const hashedPass = await bcrypt.hash(password,12);
  user = new UserModel({
      username,
      email,
      password: hashedPass
  });
  await user.save();
  res.status(200).json({message: "Registration Successful",target: "/login"})
})

app.post("/login",upload.none(), async (req,res)=>{
  const {username,password} = req.body;

  const user = await UserModel.findOne({username});

  if(!user){
      return res.status(401).json({message: 'User Does not Exist',target: undefined})
  }

  const isMatch = await bcrypt.compare(password,user.password);

  if(!isMatch){
      return res.status(401).json({message: 'Wrong Password',target: undefined})
  }
  req.session.isAuth = true;
  res.status(200).json({message: 'Success',target: '/map'})
});

app.get("/logout",(req,res)=>{
  req.session.destroy((err)=>{
      if (err) throw err;
      res.redirect("/");
  });
});







app.post('/postDemoForm',upload.none(),async (req,res)=>{
  const obj = req.body;
  let demoFormObj = new DemoFormModel(obj);

  await demoFormObj.save();

  res.status(200).json({message:"Success"});
})
app.get('/getCountriesInfo', (req,res)=>{
    res.status(200).json({response:cclist,count: cclist.length});
});
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'..','dist','starfleet','index.html'));
})
app.listen(PORT, function () {
    console.log('server started at port : '+PORT);
});

