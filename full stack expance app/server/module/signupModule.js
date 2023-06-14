const Sequalize=require('sequelize');

const sequalize=require('../util/database');

const Credential=sequalize.define('credential',{
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
    password:Sequalize.STRING
});

module.exports = Credential;