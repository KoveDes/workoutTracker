const {whiteLists} = require("../config/corsOptions");

exports.credentials = (req,res,next) => {
    const origin = req.headers.origin;
    if(whiteLists.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}