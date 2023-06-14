const User=require('../module/module');
const { use } = require('../router/router');

module.exports.dataupload=async(req,res,next)=>{
    try{
        const name=req.body.name;
        const exp=req.body.exp;
        const item=req.body.item;
        const category=req.body.category;
        console.log('datacontroller:'+name+exp+item+category);
        const data = await User.create({
            name:name,
            exp:exp,
            item:item,
            category:category
        })
        console.log("controller data creation:"+data)
    }catch(err){
        console.log(err);
    }
}

module.exports.getdata=async(req,res,next)=>{
    const expence=await User.findAll();

    try{
        res.send(expence);
    }catch(err){
        console.log(err)
        res.send(err);
    }
}

module.exports.deletedata=async(req,res,next)=>{
    const id=req.params.id;
    const deleteid=await User.findByPk(id);
    try{
        const destruction=await deleteid.destroy();
        try{
            res.send('deleted')
        }catch(error){
            res.send(error)
        }


    }catch(err){
        console.log(err);
        res.send(err);
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