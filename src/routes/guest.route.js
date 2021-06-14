const express = require('express')
const router = express.Router()
const guestController =   require('../controllers/guest.controller');


router.get('/loadbanners', guestController.loadbanners);// Retrieve home page banner
// router.post('/forgot',guestController.forgot); // send email
// router.post('/verifyOtp',guestController.verifyOtp); //Get OTP
// router.post('/resetPassword',guestController.resetPassword); //reset Password
// router.post('/updatePassword',guestController.updatePassword); //update Password
// router.post('/changePassword',guestController.changePassword); //change Password
// router.post('/visitcloseregion',guestController.visitcloseregion); ////Close regions
// router.post('/drivesnearby',guestController.drivesnearby); //drive near by
  router.get('/listbrands',guestController.listbrands);  // list of brands
 router.get('/listexperience',guestController.listexperience); // list of experiences
 router.get("/searchcar/:city",guestController.searchcar); // search cars
// router.get("/searchhouse/:city",login.searchhouse); // search houses
// router.get('/loadfilters', guestController.loadfilters); // load filter for search
// router.get('/loadmakes', guestController.loadmakes); // load makes
// router.get('/loadvehicletype', guestController.loadvehicletype); // load vehicle types
// router.get('/loadtopcities', guestController.loadtopcities); // load top cities
// router.post('/subscribenewsletter',guestController.subscribenewsletter); // sub subscribe news letter
// router.get('/loadmapdata:city',guestController.loadmapdata); // load data on map
// router.post('/getdetailbyCategory',guestController.getdetailbyCategory); // get detail
 router.post('/getListofBookings', guestController.getListofBookings);  //get list of bookings

module.exports = router