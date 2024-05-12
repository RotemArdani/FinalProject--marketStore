const express = require('express');
var router = express.Router();
const usersController = require('../controllers/Users');

router.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser);

router.route('/:User_Name')
    .get(usersController.getUser)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

router.route('/login/:User_Name')
    .post(usersController.loginUser);

router.route('/signup')
    .post(usersController.createUser);

router.route('/cartremove/:User_Name')
    .put(usersController.removeProductFromCart);

module.exports = router;