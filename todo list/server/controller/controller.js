//const { UPDATE } = require('sequelize/types/query-types');
const User=require('../model/model');

module.exports.datapost=async(req,res,next)=>{
    const name=req.body.name;
    const description=req.body.description;
    const done=req.body.done;
    console.log(name+description)
    const data=await User.create({
        name:name,
        description:description,
        done:done
    })

    try{
        console.log(data);
    }catch(error){
        console.log(error);
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

module.exports.getOne = async(req,res,next)=>{
    const id=req.params.id;
    const editid=await User.findByPk(id);
    console.log(editid);
    try{
        res.json(editid);
    }catch(err){
        console.log(err)
    }
}


module.exports.postOne = async(req,res,next)=>{
    const id=req.params.id;
    const detail=await User.findByPk(id);

    try{
        detail.name=req.body.name;
        detail.description=req.body.description;
        detail.done='true';
        const updateuser=await detail.save();
        console.log(updateuser)
        res.send(updateuser);
    }catch(err){
        console.log(err)
    }
}