const jwt = require('jsonwebtoken');

const generateToken = (req, res, next) => {
    try {
        const { email, firstName, lastName } = req.body;
        const token = jwt.sign({ email, firstName, lastName }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
        req.token = token;
        console.log('Generated Token : ', token);
        next();
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = generateToken;