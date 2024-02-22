const express = require('express');
const router = express.Router();
const { twillio, verifyTwillio, getProfile } = require('../Controller/Twillio.Controller');
const verifyToken = require('../Middlewares/VerifyToken.Middleware');

router.post('/twilio', twillio);
router.post('/twilio/verify', verifyTwillio);
router.get('/twilio/verify/profile', verifyToken, getProfile);

module.exports = router;
