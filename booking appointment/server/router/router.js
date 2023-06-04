const express=require('express');
const router=express.Router();

const controller=require('../controller/controller')

//add data to databse
router.post('/postdata',controller.postAddProduct);

//get data from database
router.get('/getdata',controller.getdata)

//delete data
router.delete('/deletedata/:id',controller.deletedata);

//get edit detail
//router.get('/geteditdetail/:id',controller.geteditdetail)



module.exports=router;
