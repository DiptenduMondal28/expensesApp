const Sequalize=require('sequelize');

const sequalize=require('../util/database');

const User=sequalize.define('user',{
    id:{
        type:Sequalize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequalize.STRING,
    email:{
        type:Sequalize.STRING,
        allowNull: false,
        unique: true
    },
    password:Sequalize.STRING,
    ispremium:Sequalize.BOOLEAN,
    totalexpence:{
        type:Sequalize.INTEGER,
        defaultValue:0
    }
});

module.exports = User;