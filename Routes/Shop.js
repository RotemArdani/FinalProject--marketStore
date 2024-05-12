const ShopController = require('../controllers/Shop');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const user_name = req.body.User_Name || '';
  console.log('shop route user_name:', user_name);

  //const search = req.query.search || '';
  ShopController.index(req, res, user_name);
});

module.exports = router;