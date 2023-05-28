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
    //f.e. load
    startedAt: {
        type: Date,
        immutable: true,
        default: function () {return Date.now()}
    }, //10th January 2021
    currentValue: Number, // 30kg
    endValue: Number, // 120kg
    // progress: Number, // take care of progress in Front-end based on curr and end value
    finishedAt: Date, // 12th June 2022
      finished: {
          type: Boolean,
          default: false
      }
});
