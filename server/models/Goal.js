const mongoose = require('mongoose');

exports.goalSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: {
            values: ['weightUp', 'weightDown', 'load', 'workoutCount', 'measurement'],
            message: "{VALUE} is not supported"
        },
        required: true,
    },
    exercise: String,
    bodyParameter: String,
    startedAt: {
        type: Date,
        immutable: true,
        default: function () {
            return Date.now()
        }
    },
    currentValue: Number,
    endValue: Number,
    finishedAt: Date,
    finished: {
        type: Boolean,
        default: false
    }
});
