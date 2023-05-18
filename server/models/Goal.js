const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: {
            values: ['weight', 'load', 'sets', 'days', 'measurement'],
            message: "{VALUE} is not supported"
        },

    }, //f.e. load
    startedAt: {
        type: Date,
        immutable: true,
        default: function () {return Date.now()}
    }, //10th January 2021
    currentValue: Number, // 30kg
    endValue: Number, // 120kg
    progress: Number, // 100%
    finished: {
        type: Boolean,
        default: false
        }, // true
    finishedAt: Date, // 12th June 2022
    description: {
        type: String,
    }, // Bench press 120kg

});
module.exports = mongoose.model('Goal', goalSchema);