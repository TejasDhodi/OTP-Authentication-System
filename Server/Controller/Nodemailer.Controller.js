const nodemailer = require('nodemailer');
const User = require('../Model/User.Controller');
const expireOTP = require('../Utility/ExpireOTP');

const storedOtp = new Map();

const sendMail = async (req, res) => {
    // Configure nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_USER_PASS
        }
    })

    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expirationTime = Date.now() + (1 * 60 * 1000);

    // Mail Details
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Scan the Menu OTP verification",
        html: ` <h1>Do Not Share With any one</h1>
        <p>Your OTP for login is: <strong>${otp}</strong></p>
        `
    };

    // Send Mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP:', error);
            res.status(500).json({ success: false, error: error.message });
        } else {
            console.log('OTP sent:');
            storedOtp.set(email, { otp, expirationTime });

            expireOTP(storedOtp, email, expirationTime);

            res.json({ success: true, otp });
        }
    })
};


const verifyMail = async (req, res) => {
    try {
        const { email, enteredOtp } = req.body;
        const sentOtp = storedOtp.get(email);
        console.log("sentOtp : ", storedOtp);

        if (!sentOtp || sentOtp.otp.toString() !== enteredOtp.toString()) {
            res.status(404).json({
                success: false,
                message: 'invalid otp'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'Login Succesfull',
                token: req.token
            });
            storedOtp.delete(email)
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { sendMail, verifyMail };