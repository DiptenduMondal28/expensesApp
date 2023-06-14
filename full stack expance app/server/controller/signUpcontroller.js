const Credential=require('../module/signupModule');

module.exports.signup=async(req,res,next)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    try{
        console.log(`name: ${name}  email:${email} password:${password}`);
        const credential=await Credential.create({
            name:name,
            email:email,
            password:password
        })
        console.log("credential created:"+credential);
    }catch(err){
        console.log(err)
    }
}