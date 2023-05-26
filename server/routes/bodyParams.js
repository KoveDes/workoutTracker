const express = require('express');
const {getLatestAll, addMeasurement, getMeasurement, changeMeasurement, deleteMeasurement} = require('../controllers/bodyParamsController')

const router = express.Router();

router.route("/")
    .get(getLatestAll) //pobierz najnowsze wymiary z każdego ciała
    // .post(addParam)
    // .patch();
//  .delete();
router.route("/:param")
    .post(addMeasurement) //add size
    .get(getMeasurement) // get all entries for param
    .patch(changeMeasurement) //change size of previous entry
    .delete(deleteMeasurement) //delete entry
// /param
// http://localhost:3000/param {}
// http://localhost:3000/leftCalf
// http://localhost:3000/leftCalf/30



module.exports = router;