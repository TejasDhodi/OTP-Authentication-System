const express = require('express');
const verifyToken = require('../Middlewares/VerifyToken.Middleware');
const { registerUser } = require('../Controller/User.Controller');
const router = express.Router();

router.post('/register', verifyToken, registerUser);

module.exports = router;