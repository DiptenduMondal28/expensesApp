const express=require('express');
const router=express.Router();

const controller=require('../controller/controller');

// user data creation for the first time or expence add
router.post('/datapost',controller.dataupload);

//user data fetching 
router.get('/getexpence',controller.getdata);

//delete data from list
router.delete('/deletadata/:id',controller.deletedata);

//get user updatae from list
router.get('/geteditdata/:id',controller.geteditdata);

//save user updata
router.put('/saveeditdata/:id',controller.saveEditdata);

module.exports=router;