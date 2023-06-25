const User=require('../module/module');
const Credential=require('../module/signupModule')
const sequelize=require('../util/database')

module.exports.dataupload=async(req,res,next)=>{
    try{
        const t = await sequelize.transaction()
        const name=req.body.name;
        const exp=req.body.exp;
        const item=req.body.item;
        const category=req.body.category;
        if(exp.length===0 || exp===undefined){
            return res.status(400).json({success:false,message:'expence parameter missing'})
        }
        try{
            await User.create({
                name:name,
                exp:exp,
                item:item,
                category:category,
                userId:req.user.id
            },{transaction: t})

            const totalExpence=Number(req.user.totalexpence)+Number(exp);
            await Credential.update({totalexpence:totalExpence},{where:{id:req.user.id},transaction: t})

            await t.commit();
            res.status(200).json({expence:expence})

        }catch(err){
            return res.status(500).json({success:false,error:err})
        }
       
    }catch(err){
        console.log(err);
    }
}

module.exports.getdata=async(req,res,next)=>{
    const expence=await User.findAll({where:{userID:req.user.id}});

    try{
        res.send(expence);
    }catch(err){
        console.log(err)
        res.send(err);
    }
}

module.exports.deletedata=async(req,res,next)=>{
    const t = await sequelize.transaction()
    const id=req.params.id;
    const deleteid=await User.findByPk(id);
    console.log(deleteid)
    console.log("deletd things expence:"+deleteid.exp)
    console.log("delete request user id:"+req.user.id)
    console.log("exp:"+req.user.totalexpence)
    
    try{
        const deleteid=await User.findByPk(id);
        if (!deleteid) {
            return res.status(404).json({ success: false, message: 'Data not found' });
        }
        console.log(deleteid)
        console.log("deletd things expence:"+deleteid.exp)
        console.log("delete request user id:"+req.user.id)
        console.log("exp:"+req.user.totalexpence)

        try{

            await deleteid.destroy({where:{userID:req.user.id},transaction:t});
            const totalExpence=Number(req.user.totalexpence)-Number(deleteid.exp);
            await Credential.update({totalexpence:totalExpence},{where:{id:req.user.id},transaction: t});
            await t.commit();
            res.status(200).json({expence:expence})

        }catch(err){

            console.log(err)
            await t.rollback();
            return res.status(500).json({success:false,error:err})

        }
       

    }catch(err){

        console.log(err);
        return res.send(err);

    }
}

module.exports.geteditdata=async(req,res,next)=>{
    let id=req.params.id;
    const editid=await User.findByPk(id);
    console.log(editid)
    try{
        res.json(editid);
    }catch(err){
        console.log(err);
    }
}

module.exports.saveEditdata=async (req,res,next)=>{
    const id=req.params.id;
    const detail=await User.findByPk(id);

    try{
        detail.name=req.body.name;
        detail.exp=req.body.exp;
        detail.item=req.body.item;
        detail.category=req.body.category;
        const updateuser=await detail.save();
        console.log(updateuser)
        res.send(updateuser);
        // try{
        //     res.json(updateuser)
        // }catch(err){
        //     console.log(err)
        // }
    }catch(err){
        console.log(err);
    }
}

// module.exports.ispremium=async (req,res,next)=>{
//     const detail=await User.findAll({where:{userID:req.user.id}});
//     res.send(detail);
// }