exports.createProduct = (req,res,next) =>{
    const name = req.body.name;
    const semester = req.body.semester;
    res.json(
        {
            message: "create product success",
            data:{
                id:1,
                name: name,
                semester: semester
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
