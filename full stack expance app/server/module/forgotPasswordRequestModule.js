const Sequelize=require('sequelize');

const sequalize=require('../util/database');

const forgotPassword = sequalize.define('forgotPasswordRequest',{
    id:{
        type:Sequelize.UUID,
        unique: true,
        primaryKey: true
    },
    active: Sequelize.BOOLEAN,
    expiresby: Sequelize.DATE
});

module.exports=forgotPassword;