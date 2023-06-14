const Sequalize=require('sequelize');

const sequalize=require('../util/database');

const Credential=sequalize.define('credential',{
    id:{
        type:Sequalize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:Sequalize.STRING,
    email:Sequalize.STRING,
    password:Sequalize.STRING
});

module.exports = Credential;