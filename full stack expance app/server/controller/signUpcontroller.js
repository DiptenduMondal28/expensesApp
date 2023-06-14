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