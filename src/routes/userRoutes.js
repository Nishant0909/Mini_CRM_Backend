const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

console.log('userRoutes');
// Register user
router.post('/register', userController.registerUser);
// Validate user (login)
router.post('/login', userController.validateUser);
// Logout user
router.post('/logout', userController.logoutUser);

module.exports = router; 