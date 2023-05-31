const express=require('express');
const bodyPerser=require('body-parser');
const path = require('path');

const app=express();

const user=require('./router/routes')
const db=require('./util/database');
const { error } = require('console');

app.use(bodyPerser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

// db.execute('SELECT * FROM  user').then(result=>{
//     console.log(result[0]);
// }).catch(error=>{
//     console.log(error);
// });

app.use(user);


app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})

app.listen(3000);
