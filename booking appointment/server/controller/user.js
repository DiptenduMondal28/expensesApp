const Users=require('../module/user')
// const {Users}=require('../module/user')
exports.getData=async(req,res,next)=>{
    const users=await Users.findAll()
    try {
        res.send(users)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.postData=async(req,res,next)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const phone=req.body.phone;
        const date=req.body.date;
        console.log("post data:"+name+email+phone+date)
        const data=await Users.create({
            name:name,
            email:email,
            phone:phone,
            date:date
        })

        res.status(201).json(data)

    }catch(err){
        res.send(err.message);
    }

}