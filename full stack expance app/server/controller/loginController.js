const Credential=require('../module/signupModule');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { where } = require('sequelize');
const env = require('dotenv').config();

function generateAccessToken(id,name){
    return jwt.sign({userId:id,name:name},process.env.token)
}

module.exports.login=async(req,res,next)=>{
        const email=req.body.email;
        const password=req.body.password;
        //console.log(`email:${email} password:${password}`)
        const credentialCheck=await Credential.findAll({where:{email}}).then(user =>{
            if(user.length>0){
                bcrypt.compare(password,user[0].password,(err,result)=>{
                    if(result){
                        res.status(200).json({success:true,message:'user logged in succesfully',user:user,token:generateAccessToken(user[0].id,user[0].name)})
                    }else{
                        return res.status(400).json({success:false,message:'check password'})
                    }

                    if(err){
                        res.status(500).json({success:false,message:`something error:${err}`})
                    }
                })
                // if(user[0].password===password){
                //     res.status(200).json({success:true,message:'user logged in succesfully'})
                // }else{
                //     return res.status(401).json({success:false,message:'check password'})
                // }
            }else{
                res.status(404).json({success:false,message:"user not signup"})
            }
        }).catch(err=>{
            res.status(500).json({success:false,message:`something error:${err}`})
        })
        
}


module.exports.ispremium=async (req,res,next)=>{
    console.log(req.user.id)
    const detail=await  Credential.findAll({where:{id:req.user.id}})
    console.log(detail)
    res.send(detail);
}