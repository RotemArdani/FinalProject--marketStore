const express = require('express');
var router = express.Router();
const OrdersController = require('../controllers/Orders');

router.post('/:User_Name', OrdersController.createOrder);
router.delete('/:_id', OrdersController.deleteOrder);

module.exports = router;