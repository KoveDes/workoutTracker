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
    height: {
        type: Number,
        min: 65,
        max: 251,
    },
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
    bodyParameters: {
        type: bodyParamsSchema,
        default: () => ({
            leftCalf : [],
            rightCalf : [],
            leftThigh : [],
            rightThigh : [],
            hips : [],
            waist : [],
            chest : [],
            neck : [],
            shoulders : [],
            leftForearm : [],
            rightForearm : [],
            leftArm : [],
            rightArm : [],

        })
    },
    customExercises: [customExerciseSchema]

}, {
    timestamps: true,
});
// collection: users
module.exports = mongoose.model('User', userSchema);