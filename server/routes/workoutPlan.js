const express = require('express');
const {
    getPlan,
    addPlan,
    updatePlan,
    removePlan,
    getAllPlans,
    getRoutine,
    addRoutine,
    updateRoutine,
    removeRoutine
} = require('../controllers/workoutPlanController')
const router = express.Router();

router.route('/')
    .get(getPlan)
    .post(addPlan)
    .patch(updatePlan) //update name or description
    .delete(removePlan);

router.route("/all").get(getAllPlans);


router.route('/routine')
    .get(getRoutine)
    .post(addRoutine)
    .patch(updateRoutine)
    .delete(removeRoutine)
//to get all routines, use /workoutPlan GET

module.exports = router;