const express = require('express');
const authController = require('./controllers/auth.controller');
const authMiddleware = require('./middlewares/auth.middleware');
const initController = require('./controllers/init.controller');
const treasureController = require('./controllers/treasures.controller');
const userController = require('./controllers/user.controller');

const router = express.Router();

// Endpoint to test if the api is working or not 
router.get('/test', userController.test);

// Endpoint to seed treasure data
router.get('/init', initController.init);

// Endpoint to login using email and password
router.post('/login', authController.login);

// Endpoint to create new user with name, email, password as input data
router.post('/user', userController.createUser);

// Endpoint to get user data based on user id
router.get('/user/:id', authMiddleware.user, userController.readUser);

// Endpoint to push a new treasure based on treasure id to a user based on user id
router.post('/user/:userId/treasure/:treasureId', authMiddleware.user, treasureController.pushTreasure);

// Endpoint to get all treasures available
router.get('/treasures', authMiddleware.user, treasureController.readTreasures);

module.exports = router;