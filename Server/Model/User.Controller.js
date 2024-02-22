const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const jwt = require('jsonwebtoken');

const userModel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}, { timestamps: true });


userModel.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email
        }, 'asdfghjklpoiuytrewqsdf', {
            expiresIn: '2d'
        })
    } catch (error) {
        console.log('JWT Error ', error);
    }
}

const User = model('User', userModel);
module.exports = User;