const express= require('express');
const route=express.Router();

const controller=require('../controller/user')

const bodyParser=require('body-parser');
//route.use(bodyParser.urlencoded({extended:false}));
route.use(bodyParser.json());

route.post('/postdata',controller.postData)
route.get('/getdata',controller.getData)

//route.post('/',controller.postData)

module.exports=route;