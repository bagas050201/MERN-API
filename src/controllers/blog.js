const {validationResult} = require('express-validator');
const blogPost = require('../models/blog');

exports.createBlogPost = (req,res,next) => {
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
//ambil semua data di Db
exports.getAllBlogPost = (req,res,next) => {
    blogPost.find()
    .then(result => {
        res.status(200).json({
            message: 'Data Blog Post Berhasil Dipanggil',
            data:result
        })
    })
    .catch(err =>{
        //jika eror maka dikirimkan ke index.js untuk dihandle oleh component eror
        next(err);
    })
}
//ambil data berdasarkan Id
exports.getBlogPostById = (req,res,next) => {
    const postId = req.params.postId;
    blogPost.findById(postId)
    .then(result => {
        //jika data tidak ditemukan
        if(!result){
            const error = new Error('Blog Post tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message:'data blog post berhasil dipanggil',
            data:result
        })
    })
    //jika respon salah
    .catch(err => {
        next(err);
    })
}

exports.updateBlogPost = (req,res,next) => {
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
    const postId = req.params.postId;

    blogPost.findById(postId)
    //promise 1 =  cari data dulu
    .then(post => {
        if(!post){
            const err = new Error('Blog Post tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }
        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();
    })
    //promise 2 = result
    .then(result => {
        res.status(200).json({
            message:'Update Success',
            data:result,
        })
    })
    .catch(err =>{
        next(err);
    })
}