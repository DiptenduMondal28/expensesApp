const User=require('../module/signupModule');//user detail or user credential
const Expence=require('../module/module');//user expence list
const sequalize=require('../util/database')

module.exports.userleaderboard=async(req,res,next)=>{
    try{
        const users= await User.findAll({
            order:[['totalexpence','DESC']]
        });
        console.log(users)
        res.status(200).json(users)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}