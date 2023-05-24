const express = require('express');
const {handleRefreshToken} = require('../controllers/refreshTokenController.js');
const router = express.Router();

router.post('/', handleRefreshToken);

module.exports = router;