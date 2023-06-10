const express=require('express');
const router=express.Router();

const controller=require('../controller/controller');

//post data
router.post('/postdata',controller.postData)

//get data
router.get('/getdata',controller.getData);

//delete data
router.delete('/deletedata/:id',controller.deletedata)


module.exports=router;