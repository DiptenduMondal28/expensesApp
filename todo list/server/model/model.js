const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const User = sequelize.define('todo-list',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:Sequelize.STRING,
    description:Sequelize.STRING,
    done:Sequelize.STRING
});

module.exports=User;