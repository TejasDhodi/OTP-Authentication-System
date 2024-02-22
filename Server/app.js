const dotenv = require('dotenv');
dotenv.config({path: './Config/Config.env'});

const express = require('express');
const app = express();

const cors = require('cors')
const Database = require('./Database/Database')

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

// Routes Import
const twilioRoutes = require('./Routes/Twilio.Route')
const nodemailerRoutes = require('./Routes/Nodemailer.Routes');
const userRoutes = require('./Routes/User.Routes');

// Routes Inititliaztion
app.use('/api/v1', twilioRoutes);
app.use('/api/v1', nodemailerRoutes);
app.use('/api/v1', userRoutes);

app.get('/', (req, res) => {
    res.send("<h1>h1ll</h1>")
});

const PORT = process.env.PORT || 8000

Database().then(
    app.listen(3000, () => {
        console.log("Jay Shree Ram");
    })
)