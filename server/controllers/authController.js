const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {cookieOptions, expirationTime} = require('../config/cookieOptions')

exports.handleLogin = async (req, res) => {
    const {login, password} = req.body;
    const cookies = req.cookies;
    if (!login || !password) {
        return res.status(400).json({message: "Login and password are required"});
    }
    try {
        const foundUser = await User.findOne({login}).exec();
        if (!foundUser) return res.status(401).json({
            message: "No User found",
        });
        const match = await bcrypt.compare(String(password), foundUser.password)
        if (match) {
            //Create JWT tokens
            const accessToken = jwt.sign(
                {
                    "username": foundUser.login,
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: expirationTime.AT}
            );
            const newRefreshToken = jwt.sign(
                {"username": foundUser.login},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: expirationTime.RT}
            );
            let newRTArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

            if (cookies?.jwt) {
                const rt = cookies.jwt;
                const foundToken = await User.findOne({rt});
                if (!foundToken) newRTArray = [];
                res.clearCookie('jwt', cookieOptions);
            }

            foundUser.refreshToken = [...newRTArray, newRefreshToken];
            await foundUser.save();

            res.cookie('jwt', newRefreshToken, {
                ...cookieOptions

            });
            console.log('New RT: ' + newRefreshToken)
            res.json({
                accessToken,
                username: foundUser.username,
                gender: foundUser.gender
            })

        } else {
            res.status(401).json({
                message: "Incorrect password"
            })
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

exports.handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401) //No content status
    const refreshToken = cookies.jwt;
    try {
        const foundUser = await User.findOne({refreshToken}).exec();
        if (!foundUser) {
            res.clearCookie('jwt', cookieOptions);
            return res.sendStatus(401);
        }
        foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
        await foundUser.save();
        res.clearCookie('jwt', cookieOptions);
        res.sendStatus(205); //Reset Content -> logout successful
    } catch (e) {
        res.status(500).json({message: e.message})
    }

};

//Without RT Reuse. User will be logged in just for 1 day
exports.handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({message: "Unauthorized"}); //request doesn't have jwt cookie
    }
    const refreshToken = cookies.jwt;
    try {
        const foundUser = await User.findOne({refreshToken}).exec();
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            //jesli będzie niewazny
            if (err) {
                console.log('RT expired');
                foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
                await foundUser.save();
            }
            if (err || foundUser?.login !== decoded?.username) {
                return res.status(403).json({message: "Forbidden"});
            }
            //RT is valid
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: expirationTime.AT}
            );

            res.json({
                accessToken,
                user: foundUser.login,
                gender: foundUser.gender,
                username: foundUser.username,
            });
        })
    } catch (e) {
        res.status(500);
    }
}