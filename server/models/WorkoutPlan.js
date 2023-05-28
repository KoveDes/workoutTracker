const mongoose = require('mongoose');

const workoutGroup = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
        },

        description: String,
        workoutRoutine: [{
            name: {
                type: String,
                // required: true,
            },
            createdAt: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            days: [Number], // Sunday - Saturday : 0 - 6
            exercises: [{
                name: String,
                restTime: Number,
                sets: [{
                    reps: Number,
                    load: Number,
                    duration: Number,
                }]
            }],
            note: String,
        }],
    },
    {timestamps: true});
//collection: workoutPlans
module.exports = mongoose.model('WorkoutPlan', workoutGroup);