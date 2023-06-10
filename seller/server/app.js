const express=require('express')
const bodyParser=require('body-parser');
const cors=require('cors')
const route=require('./route/routes');
const sequelize=require('./util/database');

const app=express();
app.use(bodyParser.json());
app.use(cors());

app.use(route);
app.use((req,res,next)=>{
    res.status(404).send('<h1>404 Error!</h1><br><h4>no page exixt like that URL!</h4>')
})

sequelize.sync().then(result=>{
    console.log("sync")
    app.listen(3000);
}).catch(err=>{
    console.log(err);
});
