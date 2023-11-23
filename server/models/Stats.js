const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    records: [
        {
            exerciseName: String,
            load: Number,
            date: {
                type: Date,
                default: function () {
                    return Date.now()
                }
            },
        }
    ],
    workoutsCount: [{
        count: Number,
        date: Date,
    }],
    setsCount: [{
        count: Number,
        date: Date,
    }],
    repsCount: [{
        count: Number,
        date: Date,
    }],
});

statsSchema.records.pre('save', (next) => {
    this.date = Date.now();
    next();
})

module.exports = mongoose.model("Stat", statsSchema);