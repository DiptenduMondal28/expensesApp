// const users=[];

// module.exports=class User{
//     constructor(name,email,phNo,date){
//         this.name=name;
//         this.email=email;
//         this.phNo=phNo;
//         this.date=date
//     }
//     save(){
//         users.push(this);
//     }

//     static fetchall(){
//         return users;
//     }
// }

const Sequelize=require('sequelize');

const sequelize=require('../util/database');


module.exports.User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING(255)
    },
    email:{
        type:Sequelize.STRING(255)
    },
    phone:{
        type:Sequelize.STRING(255)
    },
    date:{
        type:Sequelize.DATE
    }

});

