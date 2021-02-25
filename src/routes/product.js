const express = require('express');
const productController = require('../controllers/product');
const router = express.Router();
// READ -> GET
router.get('/product',productController.getAllProduct);
//CREATE -> POST
router.post('/product',productController.createProduct);

module.exports=router;