
var bodyParser = require("body-parser");  

var login=require("./routes/routes")
const jwt = require('jsonwebtoken');
 
require('dotenv').config(); 

 
const express=require('express')
const app=express(); 


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();


router.get('/', function(req, res) {
  res.json({ message: 'Welcome' });
});


router.get('/host',login.getHost);  
router.post('/host',login.host);

router.post('/editlist',login.editListing);
router.post('/deleteList',login.deleteListing);

router.post('/signup',login.register);
router.post('/login',login.login);
app.use('/api', router);
router.post('/forgot',login.sendMail); 
router.get('/host/:id',login.hostId);
router.post('/getListofBookings',login.getListofBookings);

router.get('/user',login.user);
app.use(function (err, req, res, next) {
  console.log('This is the invalid field ->', err.field)
  next(err)
})
  
module.exports=app;
    