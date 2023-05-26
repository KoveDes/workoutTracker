const {Schema} = require('mongoose');

exports.customExerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    picture: Buffer, //upload picture to database
    gif: String, //upload gif URL to database
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