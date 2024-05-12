const express = require('express');
var router = express.Router();
const productController = require('../controllers/Products');

router.route('/')
    .get(productController.getProducts)
    .post(productController.createProduct);

router.route('/:product_id')
    .get(productController.getProductById)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router;