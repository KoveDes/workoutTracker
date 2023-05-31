const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    finishedAt: {
        type: Date,
        immutable: true,
        default: function () {
            return Date.now()
        }
    },
    duration: Number,
    note: String,
    exercises: [{
        name: {type: String, required: true},
        sets: {
            type: [{
                restTime: Number,
                reps: Number,
                load: Number,
                duration: Number,
                rpe: Number,
            }],
            required: true,
        },
    }],

    //Implementation for musclesUsed in Stats
    //for each exercise in exercises[] add exercise.bodyPart
    bodyPartsUsed: [{
        bodyPart: String,
        count: Number
    }]
});
// collection: workouts
module.exports = mongoose.model('Workout', workoutSchema);