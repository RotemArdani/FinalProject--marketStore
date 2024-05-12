const HomeController = require('../controllers/Home');
const express = require('express');
const router = express.Router();

router.get('/',HomeController.index)
module.exports = router;