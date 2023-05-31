const express=require('express');
const path=require('path');
const usercontroller=require('../controllers/users')

const router=express.Router();

router.get('/',usercontroller.getData);
router.post('/',usercontroller.postData);

module.exports=router;