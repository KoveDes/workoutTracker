 const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    routineId: mongoose.Schema.Types.ObjectId,
    planId: mongoose.Schema.Types.ObjectId,
    finishedAt: {
        type: Date,
        immutable: true,
        default: function () {
            return Date.now()
        }
    },
    name: String,
    icon: String,
    note: String,
    exercises: [{
        name: {type: String, required: true},
        restTime: Number,
        sets: {
            type: [{
                reps: Number,
                load: Number,
                rpe: Number,
            }],
            required: true,
        },
    }],
});
// collection: workouts
module.exports = mongoose.model('Workout', workoutSchema);