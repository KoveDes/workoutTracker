const mongoose = require('mongoose');
const {bodyParamsSchema} = require('BodyParams');
const {goalSchema} = require("./Goal");
const {customExerciseSchema} = require("./CustomExercise");


const userSchema = new mongoose.Schema({
    login: {
        type: String,
        trim: true,
        minLength: 4,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    refreshToken: {
        type: String
    }, //Security
    email: {
        type: String
    },
    timestamps: true, //createdAt, updatedAt
    username: {
        minLength: 4,
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number,
        min: 10,
        max: 100,
    },
    height: Number, //in cm
    weightHistory: [
        {
            date: Date,
            weight: mongoose.Schema.Types.Decimal128, //float
        }
    ],
    goals: [{
        type: goalSchema,
    }],
    bodyParameters: bodyParamsSchema,
    customExercises: [{
        type: customExerciseSchema,
    }]

});
// collection: users
module.exports = mongoose.model('User', userSchema);