const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

/* GET home page. */

router.post('/', UserController.createUser);

module.exports = router;
