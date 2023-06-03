const Sequelize=require('sequelize');

const sequelize= new Sequelize('booking','root','diptendu28',{
    dialect: "mysql",
    host: "localhost"
})

module.exports=sequelize;