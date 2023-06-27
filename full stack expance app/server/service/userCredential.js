const Credential=require('../module/signupModule');

const findCredential=async(req,email)=>{
    return Credential.findAll({where:{email:email}});
}

const ispremium=async(req)=>{
    return Credential.findAll({where:{id:req.user.id}});
}

module.exports={
    findCredential,
    ispremium
};