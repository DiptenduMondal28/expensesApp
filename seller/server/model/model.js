const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Product = sequelize.define('sellertProduct',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:Sequelize.STRING,
    price:Sequelize.INTEGER,
    item:Sequelize.STRING
    
});

module.exports=Product;