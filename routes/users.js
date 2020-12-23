var express = require('express');
var router = express.Router();

var userController = require('../controller/userController')

/* GET users listing. */
router.get('/:id/detail', userController.userDetail);

module.exports = router;