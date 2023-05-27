const express = require('express');
const {getGoals,getGoal, createGoal, updateGoal, removeGoal} = require('../controllers/goalController')

const router = express.Router();

router.route("/")
    .get(getGoal)
    .post(createGoal)
    .patch(updateGoal) //change only endValue. If you want to change anything else, create new
    .delete(removeGoal);

router.route("/all")
    .get(getGoals)

module.exports = router;