const User = require('../Model/User.Controller');

const registerUser = async (req, res) => {
    try {
        const { email, firstName, lastName, phone } = req.body;
        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return res.status(400).json({
                success: false,
                message: "Email Already Exist"
            })
        } 

        if (!email || !firstName || !lastName) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }


        const createdUser = await User.create({ email, firstName, lastName, phone });

        return res.status(201).json({
            success: true,
            message: 'Registration Successful',
            userData: req.userData,
            userId: createdUser._id.toString(),
            userName: createdUser.firstName.toString()
        });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { registerUser };
