const Product=require('../model/model');

module.exports.postData=async(req,res,next)=>{
    const name=req.body.name;
    const price=req.body.price;
    const item=req.body.item;
    const data=Product.create({
        name:name,
        price:price,
        item:item
    })
}

module.exports.getData=async(req,res,next)=>{
    const fulldata=await Product.findAll();

    try{
        res.send(fulldata);
    }catch(err){
        console.log(err)
        res.send(err);
    }
}

module.exports.deletedata=async(req,res,next)=>{
    const id=req.params.id;
    const deleteid=await Product.findByPk(id);
    const destruction=await deleteid.destroy();

}