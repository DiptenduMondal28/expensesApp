const Rozarpay=require('razorpay');

const Order=require('../module/puchase');


module.exports.purchasepremium=async(req,res,next)=>{
    try{
        var rzp=new Rozarpay({
            key_id:'put key....',
            key_secret:'put decret key'
        })

        const amount=2500;

        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id,status:'PENDING'}).then(()=>{
                return res.status(201).json({order,key_id:rzp.key_id})
            }).catch(err=>{
                throw new Error(err)
            })
        })


    }catch(err){
        console.log(err)
        res.status(403).json({message:"something wrong",error:err})
    }
}

module.exports.updatetransactionstatus=async(req,res,next)=>{
    try{
        const {payment_id,order_id}=req.body;
        console.log(payment_id,order_id)
        Order.findOne({where:{orderid:order_id}}).then(order=>{
            order.update({paymentid:payment_id,status:'SUCCESSFUL'}).then(()=>{
                req.user.update({ispremiumuser:true}).then(()=>{
                    return res.status(202).json({success:true,message:'transaction successfull'});
                }).catch((err)=>{
                    throw new Error(err);
                })
            }).catch((err)=>{
                throw new Error(err);
            })
        }).catch(err=>{
            console.log(err)
        })
    }catch(err){
        console.log(err)
        throw new Error(err);
    }
}