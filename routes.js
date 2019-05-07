const express = require('express');
const authController = require('./controllers/auth.controller');
const initController = require('./controllers/init.controller');
const treasureController = require('./controllers/treasures.controller');
const userController = require('./controllers/user.controller');

const router = express.Router();

router.get('/test', userController.test);
router.get('/init', initController.init);
router.post('/login', authController.login);
router.post('/user', userController.createUser);
router.get('/user/:id', userController.readUser);
router.post('/user/:userId/treasure/:treasureId', treasureController.pushTreasure);
router.get('/treasures', treasureController.readTreasures);

module.exports = router;