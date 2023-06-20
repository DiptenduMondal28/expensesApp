const User=require('../module/signupModule');//user detail or user credential
const Expence=require('../module/module');//user expence list
const sequalize=require('../util/database')

module.exports.userleaderboard=async(req,res,next)=>{
    try{
        const users= await User.findAll({
            attributes:['id','name',[sequalize.fn('sum',sequalize.col('expences.exp')),'total_cost']],
            include:[
                {
                    model:Expence,
                    attributes:[]
                }
            ],
            group:['id'],
            order:[['total_cost','DESC']]
        });
        // console.log("user table is here:")
        // console.log(users)
        // const useraggrigadedexpence= await Expence.findAll({attributes:[
        //     'userId',[sequalize.fn('sum',sequalize.col('exp')),'total_cost']],group:['userId']
        // });
        // console.log("expence table is here:")
        //console.log(useraggrigadedexpence)
        // var leaderboardDetails=[];
        // users.forEach((user)=>{
        //     leaderboardDetails.push({name:user.dataValues.name,expence:useraggrigadedexpence[user.dataValues.id] || 0})
        // })
        console.log(users)
        //leaderboardDetails.sort((a,b)=>b.expence-a.expence)
        res.status(200).json(users)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}