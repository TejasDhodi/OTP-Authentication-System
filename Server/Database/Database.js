const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://TejasDhodi:Tejas755@tejadhodi.yxoxnmb.mongodb.net/VerifcationTest?retryWrites=true&w=majority');
        console.log('Connection Established');
    } catch (error) {
        console.log('Unable to connect to Database', error);
    }
};

module.exports = connectToDatabase;