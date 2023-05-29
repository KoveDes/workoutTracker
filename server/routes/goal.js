const express = require('express');
const {getGoals,getGoal, createGoal, updateGoal, removeGoal} = require('../controllers/goalController')

const router = express.Router();

router.route("/")
    .get(getGoal)
    .post(createGoal)
    .patch(updateGoal) //change only endValue. If you want to change anything else, create new goal instead
    .delete(removeGoal);

router.route("/all")
    .get(getGoals)
//TODO prepare for pagination f.e max 10 results

module.exports = router;