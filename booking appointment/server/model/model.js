const Sequelize = require('sequelize');

const sequelize=require('../util/database');

const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequelize.STRING(255),
    email:Sequelize.STRING(255),
    phone:Sequelize.STRING(255),
    date:Sequelize.DATE
});

module.exports=User;