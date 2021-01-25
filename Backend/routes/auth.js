const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// GET login page
router.get('/db/login', authController.getLogin);

// GET signup page
router.get('/db/signupsignup', authController.getSignup);

// POST login form
router.post('/db/login', authController.postLogin);

// POST signup form
router.post('/db/signupsignup', authController.postSignup);

// POST logout request
router.post('/db/logout', authController.postLogout);

module.exports = router;