const userrouter = require('express').Router();
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middleware/auth.middleware');
userrouter.get('/me',authMiddleware,userController.getCurrentUser);
userrouter.patch('/update',authMiddleware,userController.updateUser);
module.exports = userrouter;