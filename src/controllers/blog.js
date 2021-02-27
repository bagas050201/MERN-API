const {validationResult} = require('express-validator');

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

    const result = {
        message : "Create Blog Post Success",
        data :{
            post_id : 1,
            title : title,
            body: body,
            create_at:"12/2/20",
            author:{
                id:1,
                name:"bagas"
            }
        }
    }
    res.status(201).json(result);
}