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
            date: Date,
        }
    ],
    //How many times each muscle group has been used in 1 day
    musclesUsage: [{
        muscleGroup: String,
        count: Number,
        date: Date //Day
    }
    ],
    //Zapisać w bazie danych czy liczyć na podstawie dokumentów w BD
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
    exercisesCount: [{
        count: Number,
        date: Date,
    }],


});
module.exports = mongoose.model("Stat", statsSchema);