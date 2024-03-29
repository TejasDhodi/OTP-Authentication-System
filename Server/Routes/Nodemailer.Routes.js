const express = require('express');
const { sendMail, verifyMail } = require('../Controller/Nodemailer.Controller');
const generateToken = require('../Middlewares/GenerateToken.Middleware');
const router = express.Router();

router.post('/sendMail', sendMail);
router.post('/sendMail/verify', generateToken, verifyMail);

module.exports = router;