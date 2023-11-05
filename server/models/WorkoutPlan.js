const mongoose = require('mongoose');

const workoutGroup = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
        },
        main: Boolean,
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
                exercise: Object,
                restTime: Number,
                sets: [{
                    reps: Number,
                    showDuration: Boolean,
                    duration: Number,
                }]
            }],
            note: String,
            icon: String,
            performed: Number,
        }],
    },
    {timestamps: true});
//collection: workoutPlans
module.exports = mongoose.model('WorkoutPlan', workoutGroup);