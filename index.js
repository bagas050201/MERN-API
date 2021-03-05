const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productRoutes = require('./src/routes/product');
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const mongoose = require('mongoose');

app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})
app.use('/v1/customer', productRoutes);
app.use('/v1/auth',authRoutes);
app.use('/v1/blog',blogRoutes);

app.use((error,req,res,next) =>{
    
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message:message,data:data})
})

mongoose.connect('mongodb+srv://bagaspradana0201:bagas050201@cluster0.pvnpi.mongodb.net/Blog?retryWrites=true&w=majority')
.then(()=>{
    app.listen(4000, () => console.log('connection success'));
})
.catch(err => console.log(err));