const User = require('../Model/User.Controller');
const expireOTP = require('../Utility/ExpireOTP');

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = require('twilio')(accountSid, authToken);

const storedOtp = new Map();
const expirationTime = Date.now() + (1 * 60 * 1000);

const twillio = async (req, res) => {
    try {
        const { phone } = req.body;
        const userExist = await User.findOne({ phone });
        if (!userExist) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }
        console.log('Received phone number:', phone);
        const otp = Math.floor(1000 + Math.random() * 9000);

        await client.messages.create({
            body: `Your OTP For Login : ${otp} `,
            to: `+91${phone}`,
            from: '+14153490674',
        });

        storedOtp.set(phone, otp);
        expireOTP(storedOtp, phone, expirationTime)
        res.status(200).json({
            success: true,
            otp: otp,
            stored: storedOtp
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const verifyTwillio = async (req, res) => {
    try {
        const { phone, enteredOtp } = req.body;

        const userExist = await User.findOne({ phone });
        if (!userExist) {
            res.status(404).json({
                success: false,
                message: "User Not Found",
            })
        }

        const sentOtp = storedOtp.get(phone);

        if (!sentOtp) {
            res.status(404).json({ message: 'Otp Not Found' })
        }

        if (sentOtp.toString() == enteredOtp) {

            storedOtp.delete(phone);
            res.status(200).json({
                success: true,
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                userName: userExist.firstName.toString(),
                message: "Login Success",
            })
        } else {
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const userData = req.userData;
        console.log('userData profile: ', userData);
        const token = req.token;
        console.log('Token profile: ', token);
        return res.status(200).json({
            verifiedUser: userData,
            success: true,
            message: 'User Verified'
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Internal Unable to getProfile',
            success: false,
            error: error.message
        })
    }
};

module.exports = { twillio, verifyTwillio, getProfile };