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
    // duration: Number,
    name: String,
    icon: String,
    note: String,
    exercises: [{
        name: {type: String, required: true},
        restTime: Number, //implement
        sets: {
            type: [{
                // restTime: Number,
                reps: Number,
                load: Number,
                // duration: Number,
                rpe: Number,
            }],
            required: true,
        },
    }],

    //Implementation for musclesUsed in Records
    //for each exercise in exercises[] add exercise.bodyPart
    // bodyPartsUsed: [{
    //     bodyPart: String,
    //     count: Number
    // }]
});
// collection: workouts
module.exports = mongoose.model('Workout', workoutSchema);