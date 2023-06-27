const User=require('../module/module');
const Credential=require('../module/signupModule')
const sequelize=require('../util/database')
const Expence=require('../service/userExpences');
const { ConfigService } = require('aws-sdk');

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
    const expence=await Expence.getExpences(req)

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
    const deleteid=await Expence.getId(id);
    console.log(deleteid)
    console.log("deletd things expence:"+deleteid.exp)
    console.log("delete request user id:"+req.user.id)
    console.log("exp:"+req.user.totalexpence)
    
    try{
        const deleteid=await Expence.getId(id);
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

        }catch(err){

            console.log(err)
            return res.status(500).json({success:false,error:err})

        }
       

    }catch(err){

        console.log(err);
        await t.rollback();
        return res.send(err);

    }
}

