const express = require('express');
const app = express();
//get data from client
const bodyParser = require('body-parser');
//const productRoutes = require('./src/routes/product');
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const mongoose = require('mongoose');
//buat upload gambar
const multer = require('multer');
const path = require('path')
const fileStorage = multer.diskStorage({
    destination:(req,file,cb) => {
        //cb = callback
        cb(null,'images');
    },
    filename:(req,file,cb) => {
        cb(null,new Date().getTime() + '-' + file.originalname);
    }
})

const fileFilter = (req,file,cb) =>{
    if(
        file.mimetipe === 'image/png' || 
        file.mimetype === 'image/jpg' || 
        file.mimetype === 'image/jpeg'
    ){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

app.use(bodyParser.json());
//agar bisa hit folder images 
app.use('/images', express.static(path.join(__dirname,'images')))
//run program upload image
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'));

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})
//app.use('/v1/customer', productRoutes);
app.use('/v1/auth',authRoutes);
app.use('/v1/blog',blogRoutes);

app.use((error,req,res,next) =>{
    
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({message:message,data:data})
})

mongoose.connect('mongodb+srv://bagaspradana0201:bagas050201@cluster0.pvnpi.mongodb.net/Blog?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(()=>{
    app.listen(4000, () => console.log('connection success'));
})
.catch(err => console.log(err));