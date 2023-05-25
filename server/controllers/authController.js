const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.handleLogin = async (req, res) => {
    const {login, password} = req.body;
    const cookies = req.cookies;
    if (!login || !password) {
        return res.status(400).json({message: "Login and password are required"});
    }
    try {
        const foundUser = await User.findOne({login}).exec();
        if (!foundUser) return res.status(401).json({
            message: "Unauthorized",
        });
        const match = await bcrypt.compare(String(password), foundUser.password)
        if (match) {
            //Create JWT tokens
            const accessToken = jwt.sign(
                {
                    "login": foundUser.login,
                    //TODO store something else in AT? f.e nickname, role, current workout?
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '15m'}
            );
            const newRefreshToken = jwt.sign(
                {"login": foundUser.login},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            );
            let newRTArray = !cookies?.jwt ? foundUser.refreshToken : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

            if(cookies?.jwt) {
                const rt = cookies.jwt;
                const foundToken = await User.findOne({rt});
                if(!foundToken) newRTArray = [];
                res.clearCookie('jwt', {
                    httpOnly: true,
                    sameSite: "none",
                    maxAge: 24 * 60 * 60 * 1000
                });
            }
            foundUser.refreshToken = [newRTArray, newRefreshToken];
            await foundUser.save();
            console.log(`User after save: ${foundUser}`);

            res.cookie('jwt', newRefreshToken, {
                httpOnly: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000 //24 hours
            });
            res.json({
                accessToken
            })

        } else {
            res.status(401).json({
                message: "Unauthorized"
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
            return res.sendStatus(401);
        }
        foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
        await foundUser.save();
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: "none",
            // secure: true, //doesn't allow to test API in development
            maxAge: 24 * 60 * 60 * 1000
        });
        res.sendStatus(205); //Reset Content -> logout successful
    } catch (e) {
        res.status(500).json({message: e.message})
    }

};

exports.handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({message: "Unauthorized"}); //request doesn't have jwt cookie
    }
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', {httpOnly: true, sameSite: "none", maxAge: 24 * 60 * 60 * 1000});
    try {
        const foundUser = await User.findOne({refreshToken}).exec();

        //Detect RT reuse
        if (!foundUser) {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
                if (err) return res.status(403).json({message: "Forbidden"});
                const user = await User.findOne({login: decoded.login}).exec();
                user.refreshToken = [];
                await user.save();
            });
            return res.status(403).json({message: "Forbidden (no user)",});
        }
        const newRTArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            //RT is invalid
            if (err) {
                foundUser.refreshToken = newRTArray;
                await foundUser.save();
            }
            if (foundUser.login !== decoded.login) {
                return res.status(403).json({message: "Forbidden"});
            }
            //RT is valid
            const accessToken = jwt.sign(
                {"login": decoded.login},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30m'}
            );

            //create new RT
            const newRefreshToken = jwt.sign(
                {"login": foundUser.login},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            );
            foundUser.refreshToken = [...newRTArray, newRefreshToken];
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000 //24 hours
            });
            await foundUser.save();
            res.json({accessToken});
        })
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}