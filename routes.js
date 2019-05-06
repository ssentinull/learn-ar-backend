const express = require('express');
const authController = require('./controllers/auth.controller');
const initController = require('./controllers/init.controller');
const userController = require('./controllers/user.controller');

const router = express.Router();

router.get('/test', userController.test);
router.get('/init', initController.init);
router.post('/user', userController.create);
router.get('/user/:id', userController.read);
router.post('/login', authController.login);

module.exports = router;