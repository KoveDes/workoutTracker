const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    startedAt: Date,
    finishedAt: Date,
    routine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User>",
        required: true,
    },
    note: String,
    exercises: [{
        name: {type: String, required: true},
        sets: [{
            restTime: Number,
            reps: Number,
            load: Number,
            duration: Number,
            rpe: Number,
        }],
        note: String,
    }]
});
// collection: workouts
module.exports = mongoose.model('Workout', workoutSchema);