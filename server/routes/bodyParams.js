const express = require('express');
const {
    getLatestAll,
    addMeasurement,
    getMeasurement,
    changeMeasurement,
    deleteMeasurement
} = require('../controllers/bodyParamsController')

const router = express.Router();

router.route("/")
    .get(getLatestAll);

router.route("/:param")
    .get(getMeasurement)   // get all entries for param
    .post(addMeasurement) //add size
    .patch(changeMeasurement) //change size of previous entry
    .delete(deleteMeasurement) //delete entry

module.exports = router;