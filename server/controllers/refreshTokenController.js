const jwt = require('jsonwebtoken');
const User = require("../models/User");

exports.handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const refreshToken = cookies.jwt;
    try {
        const foundUser = await User.findOne({refreshToken});
        console.log(foundUser);
        if (!foundUser) return res.status(403).json({
            message: "Forbidden",
        });
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        //check payload
        if (foundUser.login !== decoded) {
            res.status(403).json({message: "Forbidden"});
        }
        const accessToken = jwt.sign(
            {"login": decoded.login},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30m'}
        );
        res.json({accessToken});

    } catch (e) {
        res.status(403).json({message: "Forbidden"});
    }
}