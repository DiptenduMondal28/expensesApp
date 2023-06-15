const Credential=require('../module/signupModule');

function isstringinvalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }else{
        return false;
    }
}

module.exports.signup=async(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    try{
        console.log(`name: ${name}  email:${email} password:${password}`);
        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password)){
            return res.status(400).json({err:'bad parameters fill paramters'})
        }
        const credential=await Credential.create({
            name:name,
            email:email,
            password:password
        }).then(()=>{
            res.status(201).json({message:'successfully created a profile'})
        })
        
    }catch(err){
       res.status(500).json(err)
    }
}

// module.exports.login=async(req,res,next)=>{
//     // try{
//         const email=req.body.email;
//         const password=req.body.password;
//         const credentialCheck=await Credential.findAll({where:{email}}).then(user =>{
//             if(user.length>0){
//                 if(user[0].password===password){
//                     res.status(200).json({success:true,message:'user loggedin succesfull'})
//                 }else{
//                     res.status(400).json({success:false,message:'check password'})
//                 }
//             }else{
//                 res.status(404).json({success:false,message:"user not signup"})
//             }
//         }).catch(err=>{
//             res.status(500).json({success:false,message:err})
//         })
        
// }
