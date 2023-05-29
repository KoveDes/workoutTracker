const express = require('express');
const {getSingleWeight, updateWeight, removeWeight, getAll, getInfo, updateInfo, getAuth, changeAuth} = require('../controllers/userController')
const router = express.Router();

//weight
router.route('/records')
    .get()

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