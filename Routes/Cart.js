const CartController = require('../controllers/Cart');
const express = require('express');
const router = express.Router();

router.get('/',CartController.getCart);
router.post('/:User_Name', CartController.resetCart);
module.exports = router;