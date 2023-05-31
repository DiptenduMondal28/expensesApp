const path=require('path')
const User=require('../models/user')

exports.getData=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','bookingApp.html'));
}

exports.postData=(req,res,next)=>{
   console.log(req.body)
}