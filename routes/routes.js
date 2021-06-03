var mysql = require('mysql');
var randtoken = require('rand-token');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const e = require('express');
require('dotenv').config(); 
var async = require("async"); 
 

const saltRounds = 10;


var pool      =    mysql.createPool({
  connectionLimit : 1000,
 host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_NAME,
  debug    :  false
});    


 

exports.signup = async function (req, res) {
  const password = req.body.password;
  
  bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      

      console.log(req.body);
        var token = randtoken.generate(16);
        var users = {
          "name": req.body.name,
          "logintoken": token,
          "profile_pic": "",
          "login_type": "Email and Password",
          "email": req.body.email,
          "password": hash,
          "phone": req.body.phone

        }

        pool.getConnection(function(err,connection){
          if (err) {
            //connection.release();
            throw err;
          }   

        connection.query("SELECT COUNT(*) AS cnt FROM users WHERE email = ?", req.body.email, (err, data) => {


          if (err) {
            console.log(err);
          } else {
            if (data[0].cnt > 0) {

              res.send({
                "code": 205,
                "success": "User Already Exists",
              })
            } else {

              connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
                if (error) {
                  console.log(error);

                  res.send({
                    "code": 400,
                    "failed": "error ocurred"
                  });
                } else {

                  console.log(results);

                  connection.query("SELECT * FROM users WHERE id = ?", results.insertId, (err, data) => {
        
        
                    if (err) {
                      console.log(err);
                    } else {
                      if (data.length > 0) {

                        connection.release();

                        res.send({
                          "code": 200,
                          "success": "User Registered Sucessfully",
                          "user": {
                            "id": data[0].id,
                            "name":data[0].name,
                            "email": data[0].email,
                            "logintoken": data[0].logintoken,
                            "profile_pic": data[0].profile_pic,
                            "govt_id": data[0].govt_id,
                            "login_type": data[0].login_type,
                            "work": data[0].work,
                            "location": data[0].location,
                            "about": data[0].about,
                            "phone": data[0].phone
              
                          },
              
                        });

                      }
                    }
                  }); 
                }

              });

            }
          }



        })
      }); 



    });
  });

  
}


exports.login = async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(req.body);




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
        // const comparision = await bcrypt.compareSync(password, results[0].password)
        console.log(results[0].password);
        // console.log(comparision);

        bcrypt.compare(password, results[0].password, function(err, isPasswordMatch) {   
             if(isPasswordMatch == true){

              const user = { email: req.body.email }

                console.log("loggedin");
                connection.release();
                res.send({
                  "code": 200,
                  
                  "success": "login sucessfull",
                  "user": {
                    "id": results[0].id,
                    "name":results[0].name,
                    "email": results[0].email,
                    "logintoken": results[0].logintoken,
                    "profile_pic": results[0].profile_pic,
                    "govt_id": results[0].govt_id,
                    "login_type": results[0].login_type,
                    "work": results[0].work,
                    "location": results[0].location,
                    "about": results[0].about,
                            "phone": results[0].phone

                  },


                })
             }else{

              res.send({
            "code": 204,
            "success": "Email and password does not match"
          })
             }
         });
        
      }
      else {
        res.send({
          "code": 206,
          "success": "Email does not exits"
        });
      }
    }
  });
  });

}


exports.user=async function(req,res){
  var userId=req.query.userId;
  pool.getConnection(function(err,connection){
    if (err) {
      ////connection.release();
      throw err;
    }   
  connection.query('SELECT * FROM users WHERE id = ?',[userId],(error, results, fields)=>{
    if(error){
      res.send({
        "code":400,
        "messgae":error.message
      })
    }else{

      connection.release();
      res.send({
        "code":200,
        "data":{
             "id": results[0].id,
              "name":results[0].name,
              "email": results[0].email,
              "logintoken": results[0].logintoken,
              "profile_pic": results[0].profile_pic,
              "govt_id": results[0].govt_id,
              "login_type": results[0].login_type,
              "work": results[0].work,
              "location": results[0].location,
              "about": results[0].about,
                            "phone": results[0].phone,
                            "isDocVerified": results[0].isDocVerified
              
        }
      })
    }
  })
});
}

exports.host = async function (req, res) {
  


 var amnelist=req.body.amenList.toString();
 var hRulesList=req.body.houseRuelsList.toString();
 var images=req.body.imageList.toString();

 


  var values = {
    "userId": req.body.userId,
    "countryName": req.body.countryName,
    "typeOfPropert": req.body.typeOfPropert,
    "whatGuestBook":req.body. whatGuestBook,
    "bedrooms":req.body. bedrooms,
    "noOfBed":req.body. noOfBed,
    "bedType":req.body. bedType,
    "baths": req.body.baths,
    "noOfGuests":req.body. noOfGuests,
    "listingTitle": req.body.listingTitle,
    "listingDescription": req.body.listingDescription,
    "amenList": amnelist,
    "houseRuelsList":hRulesList,
    "imageList":images,
    "additionalHouseRules":req.body. additionalHouseRules,
    "specificDestails": req.body.specificDetails,
    "noticeBeforeGuestArrival":req.body. noticeBeforeGuestArrival,
    "BookingAvailablity": req.body.BookingAvailablity,
    "arriveBefore":req.body. arriveBefore,
    "arriveAfter": req.body.arriveAfter,
    "leaveBefore": req.body.leaveBefore,
    "minStayInNight":req.body.minStayInNight,
    "maxStayInNight":req.body.maxStayInNight,
    "currencyType":req.body.currencyType,
    "basePrice": req.body.basePrice,
    "discount": req.body.discount,
    "govermentId": req.body.govermentId,
    "profilePic": req.body.profilePic,
    "addrHouseNumber":req.body.addrHouseNumber,
    "addrStreet":req.body.addrStreet,
    "addrCity":req.body.addrCity,
    "addrState":req.body.addrState,
    "lat":req.body.lat,
    "lng":req.body.lng,
    "forGuestOnly":req.body.forGuestOnly,
    "video":req.body.video,
    "cleaningfee":req.body.cleaningfee,
    "additionalfee":req.body.additonalfee

    

  }
  console.log(values);
  pool.getConnection(function(err,connection){
    if (err) {
      ////connection.release();
      throw err;
    }   
  connection.query("INSERT INTO hosting SET ? ", values, async function (error, results, fields) {

    if (error) {
      console.log(error);
      res.send({
        "code": 400,
        "failed": "Error ocurred"
      })
    } else {
      console.log(results);
      console.log(fields);

      connection.release();
      res.send({

        "code": 200,
        "success": "Data Added Sucessfully",
        "id":results.insertId

      });
    }

});
  });

}

exports.userHost=async function(req,res){
  var id=req.params.id;

  pool.getConnection(function(err,connection){
    if (err) {
      ////connection.release();
      throw err;
    }   
  connection.query('SELECT * FROM hosting WHERE userId = ?', [id],function(err,results,fields){
    if(err){
      res.send({
        "code":400,
        "message":err
      })
    }else{
      if(results.length>0){

        var i;
for (i = 0; i < results.length ; i++) {

  
    
    results[i].imageList=results[i].imageList.split(","),
    results[i].houseRuelsList=results[i].houseRuelsList.split(","),
    results[i].amenList=results[i].amenList.split(",")
    
  
   }    
        connection.release();
        res.send({
          "code":200,
          "data":results
        });
      }else{
        connection.release();
        res.send({
          "code":200,
          "message":"Id not Exist"
        })
      }
    }
  })
});
}

exports.hostId= async function(req,res,next){
  console.log("sanket");
  var id =req.params.id;
  console.log(req.params.id)

  var today = new Date();
  var TwoDigitmonth = getMonth(today);
  var date = today.getFullYear()+'-'+TwoDigitmonth+'-'+today.getDate();

  pool.getConnection(function(err,connection){
    if (err) {
      ////connection.release();
      throw err;
    }   
    console.log(44);
        connection.query("SELECT a.fromDate, a.toDate FROM ckeckin.booking_property as a where a.toDate > '"+date+"' and a.propertyId='"+id+"'",(err,result,fields)=>{
            if(err){
              res.send({
                "code":400,
                "message":err
              })
            }else{


                connection.query('SELECT * FROM hosting WHERE id = ?', [id],async function(error, results, fields){

                  if(error){
                    res.send({
                      "code":400,
                      "message":error
                    });
                  }else{
                    if(results.length > 0){

                      connection.release();

                      results[0].imageList=results[0].imageList.split(","),
                      results[0].houseRuelsList=results[0].houseRuelsList.split(","),
                      results[0].amenList=results[0].amenList.split(",")
                      
                      res.send({
                        "code":200,
                        "data":results[0],
                        "dates" : result
                      });
                    }else{

                      connection.release();
                      res.send({
                        "code":200,
                        "message":"Id not Exist"
                      })
                    }
                  }
                })


          }

        });
});
}


exports.getHost=async function(req,res){
  pool.getConnection(function(err,connection){
    if (err) {
      ////connection.release();
      throw err;
    }   
  connection.query('Select * from hosting',(err,result,fields)=>{
    if(err){
      res.send({
        "code":400,
        "message":err
      })
    }else{
      var i;
     
        if(result.length > 0){

          

          for (i = 0; i < result.length ; i++) {
      
          
          
            if(result[i].imageList!=null){
             result[i].imageList=result[i].imageList.split(",") }
             if(result[i].houseRuelsList!=null){
               result[i].houseRuelsList=result[i].houseRuelsList.split(","); }
               if(result[i].amenList!=null){
                 result[i].amenList=result[i].amenList.split(",") }
             
            
           
             
           
            }
        }
      
  connection.release();
  console.log("connection release");
         res.send({
           "code":200,
           "data":result
         })
    }
  })
})
}





exports.editlist = async function (req, res) {
  


  var amnelist=req.body.amenList.toString();
  var hRulesList=req.body.houseRuelsList.toString();
  var images=req.body.imageList.toString();
  var userId=req.body.userId;
  var id=req.body.id;
  
 
 
   var values = {
     "countryName": req.body.countryName,
     "typeOfPropert": req.body.typeOfPropert,
     "whatGuestBook":req.body. whatGuestBook,
     "bedrooms":req.body. bedrooms,
     "noOfBed":req.body. noOfBed,
     "bedType":req.body. bedType,
     "baths": req.body.baths,
     "noOfGuests":req.body. noOfGuests,
     "listingTitle": req.body.listingTitle,
     "listingDescription": req.body.listingDescription,
     "amenList": amnelist,
     "houseRuelsList":hRulesList,
     "imageList":images,
     "additionalHouseRules":req.body. additionalHouseRules,
     "specificDestails": req.body.specificDetails,
     "noticeBeforeGuestArrival":req.body. noticeBeforeGuestArrival,
     "BookingAvailablity": req.body.BookingAvailablity,
     "arriveBefore":req.body. arriveBefore,
     "arriveAfter": req.body.arriveAfter,
     "leaveBefore": req.body.leaveBefore,
     "minStayInNight":req.body.minStayInNight,
     "maxStayInNight":req.body.maxStayInNight,
     "currencyType":req.body.currencyType,
     "basePrice": req.body.basePrice,
     "discount": req.body.discount,
     "govermentId": req.body.govermentId,
     "profilePic": req.body.profilePic,
     "addrHouseNumber":req.body.addrHouseNumber,
     "addrStreet":req.body.addrStreet,
     "addrCity":req.body.addrCity,
     "addrState":req.body.addrState,
    // "lat":req.body.lat,
    // "lng":req.body.lng,
     "forGuestOnly":req.body.forGuestOnly,
     "video":req.body.video
     
 
     
 
   }
   console.log(values);
   pool.getConnection(function(err,connection){
    if (err) {
      ////connection.release();
      throw err;
    }   
   connection.query("update hosting SET ? where userId=? and id=?", [values,userId,id], async function (error, results, fields) {
 
     if (error) {
       console.log(error);
       res.send({
         "code": 400,
         "failed": "Error ocurred"
       })
     } else {
       console.log(results);
       console.log(fields);

       connection.release();

       res.send({
 
         "code": 200,
         "success": "Data updated Sucessfully",
         "id":results.insertId
 
       });
     }
 
 });
});
 
 }


 exports.deleteList=async function(req,res){
    
  var userId=req.body.userId;
  var id=req.body.id;
  pool.getConnection(function(err,connection){
    if (err) {
      ////connection.release();
      throw err;
    }     
  connection.query("DELETE FROM hosting WHERE id= ? and userId=?",[id,userId],(err,result,fields)=>{
    if(err){
      res.send({
        "code":400,
        "message":"Error Occured"
      })
    }else{

      connection.release();

      res.send({
        "code":200,
        "message":"Deleted"
      })
    }
  })
});

}



exports.searchByAdress=async function (req,res){
  var cityParameter=req.params.city;
 
  var cityString = cityParameter.split(" ").join("");
  var city = cityString.toLowerCase();

  pool.getConnection(function(err,connection){
    if (err) {
      ////connection.release();
      throw err;
    }   

  connection.query('Select * from hosting WHERE INSTR(addrCity,?)',[city],(err,result,fields)=>{
    if(err){
      console.log(err);
      res.send({
        "code":400,
        "Message":err
      });
    }else{
      var i;
      for (i = 0; i < result.length ; i++) {
      
        
          
          result[i].imageList=result[i].imageList.split(","),
          result[i].houseRuelsList=result[i].houseRuelsList.split(","),
          result[i].amenList=result[i].amenList.split(",")
          
        
         }

connection.release();
      res.send({

        "code":200,
        "result":result
      });
    }
  })
});
} 
 
  
 function getMonth(date) {
  var month = date.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
}  

 exports.getListofBookings=async function(req,res){

  var today = new Date();
  var TwoDigitmonth = getMonth(today);
  var date = today.getFullYear()+'-'+TwoDigitmonth+'-'+today.getDate();

  pool.getConnection(function(err,connection){
    if (err) {
      ////connection.release();
      throw err;
    }   


  connection.query("SELECT a.*,b.userId as hostId, b.listingTitle, b.countryName, b.addrState,b.addrCity,b.addrStreet,b.addrHouseNumber, b.imageList, c.name as host_name, c.profile_pic as host_pic, c.phone as host_phone FROM ckeckin.booking_property as a, ckeckin.hosting as b,  ckeckin.users as c where a.userId="+req.body.userId+" and a.toDate > '"+date+"' and a.propertyId=b.id and b.userId = c.id",(err,result,fields)=>{
    if(err){
      res.send({
        "code":400,
        "message":err
      })
    }else{
     
      if(result.length > 0){
        //result[0].imageList=result[0].imageList.split(",");

        for (i = 0; i < result.length ; i++) {

  
          if(req.body.userId>result[i].hostId){
                            result[i].room = result[i].hostId+"nc"+req.body.userId;
                        }else{
                          result[i].room = req.body.userId+"nc"+result[i].hostId;

                        }

          result[i].imageList=result[i].imageList.split(",")

          
        
         } 

        
        connection.release();

         res.send({
           "code":200,
           "data":result
         })
        }else{

          connection.release();

         res.send({
           "code":200,
           "data":result
         })
         
        }
    }
  })
});
} 
  
exports.forgotPassword=async function (req,res,fields){
  var password=req.body.password;
  
  var id=req.body.id;
  pool.getConnection(function(err,connection){
    if (err) {
      ////connection.release();
      throw err;
    }   
  connection.query('UPDATE users SET password= ? WHERE id= ? ',[password,id],(err,result,fields)=>{
    if(err){
      console.log(err);
      res.send({
        "code":400,
        "Message":err
      });}else{

        connection.release();

        res.send({
          "code":200,
          "result":"Password Updated"
        })
      }
  
  })
});
  }
  
  
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


  
 








