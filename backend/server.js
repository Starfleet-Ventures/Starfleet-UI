const fs = require('fs');
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const LogObject = require('./controllers/utils/logs');



const config = require('./config/database');


const formRouter = require('./controllers/routes/form');
const authRouter = require('./controllers/routes/auth');
const modelsRouter =  require('./controllers/routes/models');
const filePath = path.join(__dirname, '..','dist','starfleet');

const dev = config.development;
const PORT = dev.port;

const MONGO_URI = 'mongodb://'+ dev.username + ':' + dev.password + '@' + dev.host + '/' + dev.db
mongoose.connect(MONGO_URI,{
  useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>{
  console.log("Connected to Database");
}).catch((err)=>{
  console.error(err);
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
app.get('/reset',isAuth,(req,res)=>{
  const user = req.session.userId;
  const userPath = path.join(__dirname,'map','output',user);
  const logObject = new LogObject();
  logObject.path = req.originalUrl;
  try{
    if(fs.existsSync(userPath)){
      try{
        fs.rmSync(userPath, { recursive: true, force: true });
        logObject.message = "folder exists, successfully deleted";
        console.log(logObject);
        res.redirect('/map-ui');
        
      }
      catch(e){
        console.error(e);
        console.error("folder exists but could not delete");
        res.status(500).json({message: 'Something went wrong'});
        
      }
    }
    else{
      logObject.message ="folder does not exist";
      console.log(logObject);
      res.redirect('/map-ui');
      
    }
  }
  catch(e){
    console.error(e);
    console.error("path may not be proper");
    res.redirect('/map-ui');
  }
})
app.get('/map-ui',isAuth,(req,res)=>{
  res.sendFile(path.join(__dirname,'..','dist','starfleet','index.html'));
})
app.use('/map',isAuth,express.static(path.join(__dirname,'map')));

app.use('/auth',authRouter);
app.use('/api',modelsRouter);
app.use('/form',formRouter);

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'..','dist','starfleet','index.html'));
})
app.listen(PORT,dev.host, function () {
    console.log('server started at port : '+PORT);
});

