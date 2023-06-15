const express = require('express');
const router = express.Router();

const controller=require('../controller/loginController')

//login post request
router.post('/login',controller.login);

module.exports=router;