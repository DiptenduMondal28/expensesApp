const User=require('../model/model')


module.exports.postAddProduct =async (req, res, next) => {
    try{
      const name=req.body.name;
      const email=req.body.email;
      const phone=req.body.phone;
      const date=req.body.date;

      console.log("comes as:"+name+email+phone+date)
      const data =await User.create({
        name:name,
        email:email,
        phone:phone,
        date:date
      })
    }catch(err){
      console.log(err)
    }
  };

module.exports.getdata=async(req,res,next)=>{
  const users=await User.findAll();
  try{
    res.send(users);
  }catch(err){
    console.log('get data controller error:'+err);
    res.status(500).send(err);
  }
}

module.exports.deletedata=async(req,res,next)=>{
  const id=req.params.id;
  const deleteid=await User.findByPk(id);
  try{

    const destruction=await deleteid.destroy();

    try{
      res.send("deleted")
    }catch(err){
      res.send(err.message)
    }

  }catch(err){
    console.log(err)
    res.status(200).send(err.message)
  }
}

// module.exports.geteditdetail=async(req,res,next)=>{

//     const id=req.params.id;
//     const getid=await User.findByPk(id)
//     try{
//       res.json(getid);
//     }catch(err){
//       console.log(err)
//     }

// }
