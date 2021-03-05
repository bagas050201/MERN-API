const {validationResult} = require('express-validator');
const blogPost = require('../models/blog');

exports.createBlogPost = (req,res,next) =>{
    const title = req.body.title;
    const body = req.body.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //error.message
        const err = new Error('invalid value');
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;
    }

    const posting = new blogPost({
        title: title,
        body:body,
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