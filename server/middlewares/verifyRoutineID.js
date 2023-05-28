const mongoose = require("mongoose");

const verifyRoutineId = (req,res,next) => {
    if (!req?.body?.routineId) {
        return res.status(400).json({message: "Routine ID is required"});
    }
    req.body.routineId = new mongoose.Types.ObjectId(req.body.routineId);
    next();

}

module.exports = verifyRoutineId;