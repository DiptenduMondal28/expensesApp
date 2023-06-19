const express=require('express');
const router=express.Router();

const authentication=require('../middleware/auth');
const controller=require('../controller/premiumusercontroller');

//get leaderboard 
router.get('/leaderboard',authentication.authenticate,controller.userleaderboard);


module.exports=router;