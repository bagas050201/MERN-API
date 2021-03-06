const {validationResult} = require('express-validator');
const blogPost = require('../models/blog');

exports.createBlogPost = (req,res,next) =>{
    const errors = validationResult(req);
    //eror handling
    if(!errors.isEmpty()){
        //error.message
        const err = new Error('invalid value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('image harus di upload');
        err.errorStatus = 422;
        throw err;
    }
    
    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;

    const posting = new blogPost({
        title: title,
        body:body,
        image:image,
        author:{
            name:"bagas pradana",
            uid:1,
        }
    })
    posting.save()
    .then(result =>{
        res.status(201).json({
            message : "Create Blog Post Success",
            data :result
        });
    })
    .catch(err =>{
        console.log('err: ',err);
    });

}