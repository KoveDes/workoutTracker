const mongoose = require('mongoose');

const workoutGroup = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    timestamps: true, // createdAt, updatedAt
    description: String,
    workoutRoutine: [{
        name: {
            type:String,
            required: true,
        },
        timestamps: true,
        days: [String],
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
});
//collection: workoutPlans
module.exports = mongoose.model('WorkoutPlan', workoutGroup);