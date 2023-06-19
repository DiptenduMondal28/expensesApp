const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const route=require('./router/router');
const sequelize=require('./util/database');
const signupRouter=require('./router/signupRoute')
const loginRouter=require('./router/loginRouter');
const premiumUser=require('./router/premiumuserrouter')
const User = require('./module/signupModule');
const Expence = require('./module/module');
const purchase=require('./router/purchase');
const Order=require('./module/puchase');


const app=express();
app.use(bodyParser.json());
app.use(cors());

app.use(signupRouter) //sign up page router
app.use(loginRouter)
app.use(route);
app.use('/purchase',purchase);
app.use('/premium',premiumUser)
app.use((req,res,next)=>{
    res.status(404).send('<h1>404 Error!</h1><br><h4>no page exixt like that URL!</h4>')
})

User.hasMany(Expence);
Expence.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then(result=>{
    console.log("sync")
    app.listen(3000);
}).catch(err=>{
    console.log(err);
});
