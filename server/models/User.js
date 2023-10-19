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
    height: {
        type: Number,
        min: 65,
        max: 251,
    }, //in cm
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
    }
    ,
    customExercises: [customExerciseSchema]

}, {
    timestamps: true, //createdAt, updatedAt
});

// userSchema.pre('validate', function (next) {
//     // Check if weightHistory or other fields are modified
//     const weightHistoryModified = this.isModified('weightHistory');
//     const otherFieldsModified = Object.keys(this).some(field => field !== 'weightHistory');
//
//     // If weightHistory is not modified but other fields are, prevent addition of new weightHistory item
//     if (!weightHistoryModified && otherFieldsModified) {
//         // Remove the last item from weightHistory
//         if (this?.weightHistory?.length > 0) {
//             this?.weightHistory.pop();
//         }
//     }
//
//     next();
// });

// collection: users
module.exports = mongoose.model('User', userSchema);