var express = require('express');
var router = express.Router();

var userController = require('../app/api/controllers/users');
router.post('/register',userController.create);
router.post('/authentication',userController.authentication);

module.exports = router;
