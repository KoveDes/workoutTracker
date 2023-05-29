const mongoose = require("mongoose");
const verifyId = (req,res,next) => {
    if (!req?.body?.id) {
        return res.status(400).json({message: "ID is required"});
    }
    req.body.id = new mongoose.Types.ObjectId(req.body.id);
    next();

}
module.exports = verifyId;