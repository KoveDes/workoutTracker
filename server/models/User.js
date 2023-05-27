const mongoose = require('mongoose');
const {bodyParamsSchema} = require('./BodyParams');
const {goalSchema} = require("./Goal");
const {customExerciseSchema} = require("./CustomExercise");


const userSchema = new mongoose.Schema({
    login: {
        type: String,
        trim: true,
        minLength: [4, "Login should be at least 4 characters long"],
        required: true,
    },
    password: {
        type: String,
        trim: true,
        minLength: 4,
        required: true,
    },
    //Security
    refreshToken: [String],
    email: {
        type: String
    },
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
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            weight: Number,
        }
    ],
    goals: [{
        type: goalSchema,
    }],
    bodyParameters: bodyParamsSchema,
    customExercises: [customExerciseSchema]

}, {
    timestamps: true, //createdAt, updatedAt
});
// collection: users
module.exports = mongoose.model('User', userSchema);