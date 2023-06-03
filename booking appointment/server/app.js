const express= require('express');
const path=require('path')
const app= express()
const sequelize=require('./util/database')

const route=require('./router/routes');

const cors=require('cors');
app.use(cors);

const bodyParser=require('body-parser');
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:false}));

app.use(route)

app.use((req,res,next)=>{
    res.send("<h1>404 error</h1>")
})

sequelize.sync().then(res=>{
    console.log("sync")
    app.listen(3000);
}).catch(err=>{
    console.log(err)
})