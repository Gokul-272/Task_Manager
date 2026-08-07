const authrouter = require('express').Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { registerSchema ,loginSchema } = require('../validators/auth.validator');
authrouter.post('/logout',authController.logout);
authrouter.post('/register',validate(registerSchema),authController.register);
authrouter.post('/login',validate(loginSchema),authController.login);
authrouter.post('/refresh',authController.refreshToken);
module.exports = authrouter;