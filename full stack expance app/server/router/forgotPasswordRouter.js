const express=require('express');
const router=express.Router();

const forgotPasswordController=require('../controller/forgotPasswordController');

router.post('/forgotpassword',forgotPasswordController.forgotPasswordEmail)

module.exports=router;