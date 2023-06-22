const Sib=require('sib-api-v3-sdk');
require('dotenv').config();

const client=Sib.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

module.exports.forgotPasswordEmail=async(req,res,next)=>{
    const forgotUserEmail=req.body.email;
    //console.log(req.body.email)
    const client=Sib.ApiClient.instance;

    // Configure API key authorization: api-key
    var apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.API_KEY;
    const tranEmailApi=new Sib.TransactionalEmailsApi;

    const sender={
        email:'tony28mondal@gmail.com'
    }
    const receivers=[
        {
            email:forgotUserEmail
        }
    ]

    tranEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:'OTP VERIFICATION',
        textContent:'your otp for login again in our system is:2302'
    }).then(result=>{
        console.log(result);
        res.status(201).json({success:true,message:'we have send you OTP in your user email account'});
    }).catch(err=>{
        console.log(err)
        return res.status(500).json(err)
    })
}