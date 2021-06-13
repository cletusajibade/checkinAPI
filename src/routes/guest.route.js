const express = require('express')
const router = express.Router()
const guestController =   require('../controllers/guest.controller');
// Retrieve home page banner

router.get('/loadbanners', guestController.loadbanners);
 
router.get('/getListofBookings', guestController.getListofBookings);
 
router.post('/forgot',guestController.forgot);
router.post('/verifyOtp',guestController.verifyOtp);
router.post('/resetPassword',guestController.resetPassword);

router.post('/updatePassword',guestController.updatePassword);

router.post('/changePassword',guestController.changePassword);
 
router.post('/visitcloseregion',guestController.visitcloseregion);
router.post('/drivesnearby',guestController.drivesnearby);
router.post('/listbrands',guestController.listbrands);
router.post('/listexperience',guestController.listexperience);
 
router.get("/searchcar/:city",login.searchcar);


router.get("/searchhouse/:city",login.searchhouse);
module.exports = router