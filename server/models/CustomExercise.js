const {Schema} = require('mongoose');

exports.customExerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: String, //upload image/gif URL to database
    activeMuscles: {
        type: [String],
        required: true,
    },
    equipment: String,
    primaryMuscle: {
        type: String,
        required: true,
    },
});