const express = require('express');
const {getWorkout, saveWorkout, removeWorkout, getWorkouts} = require("../controllers/workoutController.js");

const router = express.Router();

router.route("/")
    .get(getWorkout)
    .post(saveWorkout)
    // .patch() user can't change the finished workout values
    .delete(removeWorkout);

router.route('/all')
    .get(getWorkouts);
//TODO prepare for pagination f.e max 10 results

module.exports = router;
