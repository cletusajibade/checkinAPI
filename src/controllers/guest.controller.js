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
 

exports.getListofBookings=async function(req,res){

    Guest.getListofBookings(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest});

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
    Guest.resetPassword(function(err, guest,statuscode) {
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

 exports.searchhouse=async (req,res,fields)=>{
    Guest.searchhouse(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest}); 
}); 
 }
 exports.searchcar=async (req,res,fields)=>{
    Guest.searchcar(function(err, guest,statuscode) {
        res
        .status(200)
        .json({"message":err,"status":statuscode,"data":guest}); 
}); 
 }