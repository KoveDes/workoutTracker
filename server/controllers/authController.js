const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.handleLogin = async (req, res) => {
    const {login, password} = req.body;
    if (!login || !password) {
        return res.status(400).json({message: "Login and password are required"});
    }
    try {
        const foundUser = await User.findOne({login});
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
                {expiresIn: '1h'}
            );
            const refreshToken = jwt.sign(
                {"login": foundUser.login},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '30m'}
            );
            foundUser.refreshToken = refreshToken;
            await foundUser.save();
            console.log(`User after save: ${foundUser}`);

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
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
        const foundUser = await User.findOne({refreshToken});
        if (!foundUser) {
            return res.sendStatus(401);
        }
        foundUser.refreshToken = "";
        await foundUser.save();
        res.clearCookie('jwt', {
            httpOnly: true,
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
        return res.status(401).json({message: "Unauthorized"});
    }
    const refreshToken = cookies.jwt;
    try {
        const foundUser = await User.findOne({refreshToken});
        console.log(foundUser);
        if (!foundUser) return res.status(403).json({
            message: "Forbidden no user",
        });
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        //check payload
        if (foundUser.login !== decoded.login) {
            return res.status(403).json({message: "Forbidden"});
        }
        const accessToken = jwt.sign(
            {"login": decoded.login},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30m'}
        );
        res.json({accessToken});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}