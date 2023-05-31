const express = require('express');
const {getWorkout, saveWorkout, removeWorkout, getWorkouts, getNotes} = require("../controllers/workoutController.js");

const router = express.Router();

router.route("/")
    .get(getWorkout)
    .post(saveWorkout)
    // .patch() user can't change the finished workout values
    .delete(removeWorkout);

router.route('/all/:limit?/:skip?')
    .get(getWorkouts);


router.route('/notes/:limit?/:skip?')
 .get(getNotes);

module.exports = router;
