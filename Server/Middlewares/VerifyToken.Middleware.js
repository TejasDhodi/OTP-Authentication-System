const jwt = require('jsonwebtoken');
const User = require('../Model/User.Controller');

// Verify JWT token middleware
const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization']; // Get the token from the Authorization header
        console.log('Header : ', token);
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Token not provided or malformed' });
        }
        const jwtToken = token.replace('Bearer ', ''); // Remove the 'Bearer ' prefix
        console.log('jwt : ', jwtToken);

        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        const userData = await User.findOne({_id: decoded.userId});
        console.log("Userdata verify : ", userData);


        req.userData = userData;
        req.token = token;
        console.log("decoded.email");
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
    }
};

module.exports = verifyToken;
