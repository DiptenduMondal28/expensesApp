const User=require('../module/signupModule');//user detail or user credential
const Expence=require('../module/module');//user expence list

module.exports.userleaderboard=async(req,res,next)=>{
    try{
        const users= await User.findAll();
        console.log("user table is here:")
        console.log(users)
        const expences= await Expence.findAll();
        console.log("expence table is here:")
        console.log(expences)
        const useraggrigadedexpence={}
        expences.forEach((expence)=>{
           if(useraggrigadedexpence[expence.dataValues.userId]){
                useraggrigadedexpence[expence.dataValues.userId]=useraggrigadedexpence[expence.dataValues.userId]+expence.dataValues.exp;
           }else{
            useraggrigadedexpence[expence.dataValues.userId]=expence.dataValues.exp;
           }
            
        })
        var leaderboardDetails=[];
        users.forEach((user)=>{
            leaderboardDetails.push({name:user.dataValues.name,expence:useraggrigadedexpence[user.dataValues.id] || 0})
        })
        console.log(leaderboardDetails)
        leaderboardDetails.sort((a,b)=>b.expence-a.expence)
        res.status(200).json(leaderboardDetails)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}