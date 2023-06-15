const express=require('express');
const router=express.Router();

const controller=require('../controller/controller');

//get all data
router.get('/getdata',controller.getdata)

//post all data
router.use('/postdata',controller.datapost);

//get one data
router.get('/getOne/:id',controller.getOne);

//put one data 
router.put('/putOne/:id',controller.postOne)

module.exports=router;