'use strict';

var bcrypt = require('bcrypt');

var dbConn = require('./../../config/db.config');
//Employee object create

 
var Users = function(userslogin){
  this.id     = userslogin.id;
  this.name      = userslogin.name;
  this.password = employee.password;
  this.email          = employee.email;

};
var Banners = function(banners){
    this.first_name     = banners.Imagefile;
   
  };
  Banners.loadbanners = function (guestdata) {
      
    dbConn.query("select * from ckeckin.banners", function (err, res) {
    if(err) {
      console.log("error: ", err);
      guestdata(err, null);
    }
    else{

      guestdata("OK", res,200);
    }
    });
    };

    Banners.listbrands = function (guestdata) {
      console.log("a");
      dbConn.query("SELECT * FROM ckeckin.brandlist", function (err, res) {
      if(err) {
        console.log("error: ", err);
        guestdata(err, null);
      }
      else{
  
        guestdata("OK", res,200);
      }
      });
      };

      Banners.listexperience = function (guestdata) {
        console.log("a");
        dbConn.query("SELECT * FROM ckeckin.experiencelist", function (err, res) {
        if(err) {
          console.log("error: ", err);
          guestdata(err, null);
        }
        else{
    
          guestdata("OK", res,200);
        }
        });
        };
    Banners.getListofBookings = function (page,numPerPage,guestdata)  
    {
     
    
var skip = (page-1) * numPerPage; 
var limit = skip + ',' + numPerPage; // Here we compute the LIMIT parameter for MySQL query
dbConn.query('SELECT count(*) as numRows FROM ckeckin.hosting',function (err, rows, fields) {
    if(err) {
        console.log("error: ", err);
        guestdata(err, null);
    }else{
        var numRows = rows[0].numRows;
        var numPages = Math.ceil(numRows / numPerPage);
        dbConn.query('SELECT * FROM ckeckin.hosting LIMIT ' + limit,function (err, rows, fields) {
            if(err) {
                console.log("error: ", err);
                guestdata(err, null);
            }else{
                console.log(rows)
                guestdata(null, rows,numPages,200);
            }
        });            
    }
});
    };


    Banners.forgot = function (guestdata)  
    {
      var email=req.body.email;
      console.log(email);
  
      const transporter = nodemailer.createTransport({
       service: 'gmail',
       host: 'smtp.gmail.com',
       auth: {
           user: 'testsmtp.10001@gmail.com',
           pass: 'testsmtp@123'
       }
   });
  
      
     var randomNumber = Math.floor(100000 + Math.random() * 900000);
     //var emailForget = "<div>Hello,<br><p>Please use below code to reset your password.</p><br>Code : "+randomNumber+"</div>";
     
     pool.getConnection(function(err,connection){
       if (err) {
         //connection.release();
         throw err;
       }   
     
     connection.query('SELECT * FROM users WHERE email = ?', [email], async function (error, results, fields) {
       if (error) {
         res.send({
           "code": 400,
           "failed": "error ocurred"
         })
       } else {
   
         if (results.length > 0) {
           
           var today = new Date();
           var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  
           connection.query('UPDATE users SET reset_otp= ?, otp_date= ? WHERE email= ? ',[randomNumber,date,email],(err,result,fields)=>{
             if(err){
               console.log(err);
               res.send({
                 "code":400,
                 "Message":err
               });}else{
                 var resetLink = "http://checkinapp.xyz/resetPassword/"+randomNumber; 
                 var emailForget = '<!DOCTYPE html><html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="x-apple-disable-message-reformatting"><title></title><link href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700" rel="stylesheet"><style>html,body{margin:0 auto !important;padding:0 !important;height:100% !important;width:100% !important;background:#f1f1f1}*{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}div[style*="margin: 16px 0"]{margin:0 !important}table,td{mso-table-lspace:0pt !important;mso-table-rspace:0pt !important}table{border-spacing:0 !important;border-collapse:collapse !important;table-layout:fixed !important;margin:0 auto !important}img{-ms-interpolation-mode:bicubic}a{text-decoration:none}*[x-apple-data-detectors], .unstyle-auto-detected-links *,.aBn{border-bottom:0 !important;cursor:default !important;color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important}.a6S{display:none !important;opacity:0.01 !important}.im{color:inherit !important}img.g-img+div{display:none !important}@media only screen and (min-device-width: 320px) and (max-device-width: 374px){u ~ div .email-container{min-width:320px !important}}@media only screen and (min-device-width: 375px) and (max-device-width: 413px){u ~ div .email-container{min-width:375px !important}}@media only screen and (min-device-width: 414px){u ~ div .email-container{min-width:414px !important}}</style><style>.primary{background:#17bebb}.bg_white{background:#fff}.bg_light{background:#f7fafa}.bg_black{background:#000}.bg_dark{background:rgba(0,0,0,.8)}.email-section{padding:2.5em}.btn{padding:10px 15px;display:inline-block}.btn.btn-primary{border-radius:5px;background:#17bebb;color:#fff}.btn.btn-white{border-radius:5px;background:#fff;color:#000}.btn.btn-white-outline{border-radius:5px;background:transparent;border:1px solid #fff;color:#fff}.btn.btn-black-outline{border-radius:0px;background:transparent;border:2px solid #000;color:#000;font-weight:700}.btn-custom{color:rgba(0,0,0,.3);text-decoration:underline}h1,h2,h3,h4,h5,h6{font-family:serif;color:#000;margin-top:0;font-weight:400}body{font-family:serif;font-weight:400;font-size:15px;line-height:1.8;color:rgba(0,0,0,.4)}a{color:#17bebb}table{}.logo h1{margin:0}.logo h1 a{color:#17bebb;font-size:24px;font-weight:700;font-family:serif}.hero{position:relative;z-index:0}.hero .text{color:rgba(0,0,0,.3)}.hero .text h2{color:#000;font-size:34px;margin-bottom:15px;font-weight:300;line-height:1.2}.hero .text h3{font-size:24px;font-weight:200}.hero .text h2 span{font-weight:600;color:#000}.product-entry{display:block;position:relative;float:left;padding-top:20px}.product-entry .text{width:calc(100% - 125px);padding-left:20px}.product-entry .text h3{margin-bottom:0;padding-bottom:0}.product-entry .text p{margin-top:0}.product-entry img, .product-entry .text{float:left}ul.social{padding:0}ul.social li{display:inline-block;margin-right:10px}.footer{border-top:1px solid rgba(0,0,0,.05);color:rgba(0,0,0,.5)}.footer .heading{color:#000;font-size:20px}.footer ul{margin:0;padding:0}.footer ul li{list-style:none;margin-bottom:10px}.footer ul li a{color:rgba(0,0,0,1)}@media screen and (max-width: 500px){}</style></head><body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;"><center style="width: 100%; background-color: #f1f1f1;"><div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;"> &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div><div style="max-width: 600px; margin: 0 auto;" class="email-container"><table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;"><tr><td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;"><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td class="logo" style="text-align: left;"><h1><a href="#">Checkin</a></h1></td></tr></table></td></tr><tr><td valign="middle" class="hero bg_white" style="padding: 2em 0 2em 0;"><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding: 0 2.5em; text-align: left;"><div class="text"><h2>Hello '+results[0]["name"]+',</h2><h3>Please <a href="'+resetLink+'">Click here!</a> to reset your password.</h3></div></td></tr></table></td></tr></table><table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;"><tr><td valign="middle" class="bg_light footer email-section"><table><tr><td valign="top" width="33.333%" style="padding-top: 20px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="text-align: left; padding-right: 10px;"><h3 class="heading">About</h3><p>Lorem ipsum Lorem ipsum.</p></td></tr></table></td><td valign="top" width="33.333%" style="padding-top: 20px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="text-align: left; padding-left: 5px; padding-right: 5px;"><h3 class="heading">Contact Info</h3><ul><li><span class="text">Lorem ipsum, USA</span></li><li><span class="text">+* *** *** ****</span></a></li></ul></td></tr></table></td><td valign="top" width="33.333%" style="padding-top: 20px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="text-align: left; padding-left: 10px;"><h3 class="heading">Useful Links</h3><ul><li><a href="#">Lorem1</a></li><li><a href="#">Lorem2</a></li><li><a href="#">Lorem3</a></li><li><a href="#">Lorem4</a></li></ul></td></tr></table></td></tr></table></td></tr></table></div></center></body></html>';
     
  
                 transporter.sendMail({
                   from:"testsmtp.10001@gmail.com",
                   to:email,
                   subject:"Forgot Password for Checkin",
                   text:"Forgot Password",
                   html:emailForget
                 },(err,info)=>{
                   if(err){
                     console.log(err)
                   }else{
                     console.log(info);
  
                     connection.release();
  
                     res.send({
                       "code":200,
                       "result":"An otp has been sent to your email address for reset password."
                     })
                   }
                 }); 
                 
               }
           
           })
         }
         else {
  
           connection.release();
  
           res.send({
             "code": 206,
             "success": "Email does not exits"
           });
         }
       }
     });
   });
     
    };
    Banners.changePassword = function (old_password,new_password,userId,guestdata)  
    {
     
      pool.getConnection(function(err,connection){
        if (err) {
          //connection.release();
          throw err;
        }   
      connection.query('SELECT id, password FROM users WHERE id = ?', [userId], async function (error, results, fields) {
        if (error) {
          res.send({
            "code": 400,
            "failed": "error ocurred"
          })
        } else {
    
          if (results.length > 0) {
  
            bcrypt.compare(old_password, results[0].password, function(err, isPasswordMatch) {   
               if(isPasswordMatch == true){
  
                bcrypt.genSalt(10, function(err, salt) {
                    if (err) 
                      return callback(err);
  
                    bcrypt.hash(new_password, salt, function(err, hash) {
  
                          connection.query('UPDATE users SET password= ? WHERE id = ?',[hash, userId],(err,result,fields)=>{
                            if(err){
                              console.log(err);
                              res.send({
                                "code":400,
                                "Message":err
                              });}else{
  
                                connection.release();
  
                                res.send({
                                  "code":200,
                                  "result":"Password Updated."
                                })
                              }
                          
                          })
  
                    });
  
                  });
  
  
               }else{
  
                    res.send({
                                  "code":206,
                                  "result":"Please enter correct details."
                                })
               }
  
             }); 
  
          }
          else{
  
            connection.release();
            res.send({
              "code": 206,
              "success": "Please enter correct details."
            });
          }
        }
  
      });
    });
              
      };
   
      Banners.resetPassword = function (email,otp,guestdata)  
      {
       
        pool.getConnection(function(err,connection){
          if (err) {
            //connection.release();
            throw err;
          }   
        connection.query('SELECT * FROM users WHERE email = ? and reset_otp = ?', [email,otp], async function (error, results, fields) {
          if (error) {
            res.send({
              "code": 400,
              "failed": "error ocurred"
            })
          } else {
      
            if (results.length > 0) {
    
    
               bcrypt.genSalt(10, function(err, salt) {
                      if (err) 
                        return callback(err);
    
                      bcrypt.hash(password, salt, function(err, hash) {
    
                          connection.query('UPDATE users SET password= ?, reset_otp= ? WHERE email= ? and reset_otp = ?',[hash,'none',email,otp],(err,result,fields)=>{
                            if(err){
                              console.log(err);
                              res.send({
                                "code":400,
                                "Message":err
                              });}else{
    
                                connection.release();
    
                                res.send({
                                  "code":200,
                                  "result":"Password Updated."
                                })
                              }
                          
                          })
                      })
                      
                })          
    
            }
            else{
    
              connection.release();
              res.send({
                "code": 206,
                "success": "Please enter correct details."
              });
            }
          }
    
        });
      });
                
        };
        

        Banners.searchCarByAdress = function (city,guestdata) {
      
          var cityParameter=city;
          console.log(cityParameter);
          var cityString = cityParameter.split(" ").join("");
          var city = cityString.toLowerCase();
          
        
          dbConn.query('Select * from car_hosting WHERE INSTR(cityName,?)',[city],(err,result,fields)=>{
          
              var i;
              for (i = 0; i < result.length ; i++) {
              
                    if(result[i].carsImageArray!=null){
                     result[i].carsImageArray=result[i].carsImageArray.split(","); 
                    }	  
                    guestdata("OK", result,200);
              
            }
          })
        
      };
     

 function getMonth(date) {
  var month = date.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
}  
module.exports= Banners;