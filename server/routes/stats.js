const express = require('express');
const {getStats, getRecords, getMuscleUsage, getWorkoutsCount, getSetsCount, getRepsCount, getWorkoutTime} = require('../controllers/statsController')
const router = express.Router();

//weight
router.route('/records/:muscleGroup?')
    .get(getRecords)

//6 requests to get all stats
router
    .get('/muscleUsage/:year?/:month?', getMuscleUsage)
    .get('/workoutsCount/:year?/:month?', getWorkoutsCount)
    .get("/setsCount/:year?/:month?", getSetsCount)
    .get("/repsCount/:year?/:month?", getRepsCount)
    .get("/workoutTime/:year?/:month?", getWorkoutTime) //total and avg time


//1 request for all stats (without records)
router.route("/:year?/:month?").get(getStats);
/*
* /stats/records
* /stats/records/all
* /stats/muscleUsage/      search by month default: all  ??????????
* /stats/workoutsCount     search by month default: all
* /stats/setsCount         search by month default: all
* /stats/repsCount         search by month default: all
* /stats/workoutTime
* */





module.exports = router;