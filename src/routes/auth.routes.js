const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { registerSchema ,loginSchema } = require('../validators/auth.validator');
router.post('/logout',authController.logout);
router.post('/register',validate(registerSchema),authController.register);
router.post('/login',validate(loginSchema),authController.login);
router.post('/refresh',authController.refreshToken);
module.exports = router;