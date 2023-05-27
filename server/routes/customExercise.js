const express = require('express');
const router = express.Router();
const {getAll, getSingle, create, update, remove} = require('../controllers/customExerciseController');


router.route("/")
    .get(getSingle)
    .post(create)
    .put(update)
    .delete(remove)

router.route("/all")
    .get(getAll)

module.exports = router;