const AdminController = require('../controllers/Admin');
const express= require('express');
const router = express.Router();

router.get('/',AdminController.index)

module.exports = router;