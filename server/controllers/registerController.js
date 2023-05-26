const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const {login, password} = req.body; //String or undefined
    //check if login exits, is String and is 4 char
    if (!login || !password) {
        return res.status(400).json({
            message: "Login and password are required"
        });
    }
    if (login.includes(' ') || login.includes('.')) {
        return res.status(400).json({
            message: "Login must not contain spaces or dots"
        });
    }
    if(password.includes(' ') || password.length < 4) {
        return res.status(400).json({
            message: "Invalid password",
            tipLength: "Password must be at least 4 characters long",
            tipSpace: "Password must not contain spaces"
        });
    }
    try {
        const duplicate = await User.find({login});
        if (duplicate.length) return res.status(409).json({
            message: "User already exists!"
        });
        const hashedPassword = await bcrypt.hash(password, 13);
        await User.create({
            login: String(login),
            password: String(hashedPassword),
        });
        res.status(201).json({message: "New User created"});
    } catch (e) {
        res.status(500).json({message: e.message})
    }

    //#1 check if params exist
    //#2 validate params
    //#3 Check for duplicate login
    //#4 Encrypt password
    //#5 store new User
    //#6

}


module.exports = {createUser};