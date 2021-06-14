'use strict';
const Guest = require('../models/guest.model');


// exports.findAll = function(req, res) {
//     Guest.findAll(function(err, guest) {
//   console.log('controller')
//   if (err)
//   res.send(err);
//   console.log('res', guest);
//   res.send(guest);
// });
// };
exports.loadbanners = function( req,res) {
    debugger
    Guest.loadbanners(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest});

});
} 
  
exports.searchcar=async function (req,res){
  
    console.log(req.params.city);
    Guest.searchCarByAdress(req.params.city,function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest});

});
}

exports.getListofBookings=async function(req,res){

    console.log(req.body.page);
    console.log(req.body.city);
    
    Guest.getListofBookings(req.body.page,req.body.numPerPage,function(err, guest,numpages,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest,"totalpages":numpages});

});
  }

  exports.forgot=async (req,res,fields)=>{
    Guest.forgot(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest}); 
}); 
 }

 exports.resetPassword=async (req,res,fields)=>{

    const pass_Users = new Users(req.body);

    Guest.resetPassword(pass_Users,function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest}); 
}); 
 }

 exports.changePassword=async (req,res,fields)=>{
    Guest.changePassword(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest}); 
}); 
 }
 
 exports.visitcloseregion=async (req,res,fields)=>{
    Guest.visitcloseregion(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest}); 
}); 
 }
 
 exports.drivesnearby=async (req,res,fields)=>{
    Guest.drivesnearby(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest}); 
}); 
 }
 exports.listexperience=async (req,res,fields)=>{
    Guest.listexperience(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest}); 
}); 
 }
 exports.listbrands=async (req,res,fields)=>{
      
    Guest.listbrands(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest}); 
}); 
 }
 exports.listexperience=async (req,res,fields)=>{
     
   Guest.listexperience(function(err, guest,statuscode) {
       res
       .status(200)
       .json({"message":err,"status":statuscode,"data":guest}); 
}); 
}

 exports.searchhouse=async (req,res,fields)=>{
    Guest.searchhouse(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest}); 
}); 
 } 