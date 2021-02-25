exports.createProduct = (req,res,next) =>{
    console.log('request', req.body);
    res.json(
        {
            message: "create product success",
            data:{
                id:1
            }
        }
    );
    next();
}
exports.getAllProduct = (req,res,next) =>{
    console.log('request', req.body);
    res.json(
        {
            message: "Get product success",
            data:{
                id:1,
                name: 'getAllProduct'
            }
        }
    );
    next();
}
