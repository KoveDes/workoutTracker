const express = require('express');
const {getSingleWeight, updateWeight, removeWeight, getAll, getInfo, updateInfo, getAuth, changeAuth} = require('../controllers/userController')
const router = express.Router();

//weight
router.route('/weight')
    .get(getSingleWeight)
    // .post(addRecord) new weight is added in /user route
    .patch(updateWeight)
    .delete(removeWeight);

router.route("/weight/all/:limit?/:skip?").get(getAll);



/* const {email, username, gender, age, height, weight(latest)} = req.body; */
router.route('/')
    .get(getInfo)
    .patch(updateInfo)
    // .delete() user can't delete his account's info
router.route('/auth')
    .get(getAuth)
    .patch(changeAuth) //user can only change password, that's why nickname exists
    // .post(); user can't add new login or password





module.exports = router;