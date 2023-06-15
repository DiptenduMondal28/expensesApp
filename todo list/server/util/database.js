const Sequelize=require('sequelize');

const sequelize = new Sequelize('todo','root','diptendu28',{dialect:'mysql',host:'localhost'})

module.exports=sequelize;