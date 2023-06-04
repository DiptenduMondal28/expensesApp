const Sequelize=require('sequelize');

const sequelize=new Sequelize('appointment','root','diptendu28',{dialect:'mysql',host:'localhost'});

module.exports=sequelize;