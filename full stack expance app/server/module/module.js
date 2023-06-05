const Sequalize=require('sequelize');

const sequalize=require('../util/database');

const User= sequalize.define('expence',{
    id:{
        type:Sequalize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequalize.STRING,
    exp:Sequalize.INTEGER,
    item:Sequalize.STRING,
    category:Sequalize.STRING
});

module.exports=User;