const express = require('express');
const {getStats, getRecords} = require('../controllers/statsController')
const router = express.Router();

//weight
router.route('/records/:muscleGroup?')
    .get(getRecords)

router.route("/").get(getStats);






module.exports = router;