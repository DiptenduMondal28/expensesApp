const jwt=require('jsonwebtoken');
const User=require('../module/signupModule');

const authenticate=(req,res,next)=>{
    const token=req.header('Authorization');
    console.log(token);
    const user=jwt.verify(token,'3fb0815c28219e153c15456797f7f6df222623ea516cee8c9482b06915ac3710');
    console.log("user id>>"+user.userId)
    User.findByPk(user.userId).then(user=>{
        console.log(JSON.stringify(user));
        req.user=user;
        next();
    }).catch(err=>{
        console.log(err)
    })
}

module.exports={authenticate}