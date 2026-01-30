const express = require('express');
const controller = require('../controllers/authController');

export const router = express.Router();

router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/login/google', controller.googleLogin);
router.get('/login/google/callback', controller.googleCallback)
