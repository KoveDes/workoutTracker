const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({message: "Unauthorized access (No auth token is provided)"})
    const token = authHeader.split(' ')[1] //pull token from header
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.login;
        next();
    } catch(e) {
        return res.status(403).json({message: "Access is Forbidden"});
    }
}
module.exports = verifyJWT;