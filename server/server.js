require('dotenv').config();
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const {connectDB} = require('./config/dbConnection');
const {corsOptions} = require("./config/corsOptions");
const cookieParser = require('cookie-parser');
const {logger} = require("./middlewares/logger");
const {credentials} = require("./middlewares/credentials");
const verifyJWT = require('./middlewares/verifyJWT');
const {production} = require("./config/config");

//Connect to Database (MongoDB)
connectDB();

const app = express();
const port = process.env.PORT || 3500;

//Middlewares
app.use(express.json());
app.use(credentials); //fetch cookies credentials requirement
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger); //console log path and method

//Routers
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/body', verifyJWT, require('./routes/bodyParams'));
app.use('/customExercise', verifyJWT, require('./routes/customExercise'));
app.use('/user', verifyJWT, require('./routes/user'));
app.use('/goal', verifyJWT, require('./routes/goal'));
app.use('/workoutPlan', verifyJWT, require('./routes/workoutPlan'));
app.use('/workouts', verifyJWT, require('./routes/workout'));
app.use('/stats', verifyJWT, require('./routes/stats'));

//Handle 404
app.get('/*', (req, res) => {
    res.status(404).json({error: "404 Not Found"});
})

//If the connection is successfull, start HTTP server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port,  production ? '0.0.0.0' : 'localhost', () => {
        console.log(`Listening on http://localhost:${port}`);
    })
})
