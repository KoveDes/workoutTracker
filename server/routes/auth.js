const express = require('express');
const {handleLogin} = require('../controllers/authController.js');
const router = express.Router();

router.post('/', handleLogin);

module.exports = router;