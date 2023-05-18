require('dotenv').config();
const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const {connectDB} = require('./config/dbConnection');

//Connect to Database (MongoDB)
connectDB();

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use((req,res,next) => {
    console.info(`Method: ${req.method} at "${req.path}" (${new Date().toLocaleString()})`);
    next();
})

//Redirects
//Routers


//If the connection is successfull, start HTTP server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, 'localhost', () => {
        console.log(`Listening on http://localhost:${port}`);
    })
})
