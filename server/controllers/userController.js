const User = require('../models/User');
const bcrypt = require('bcrypt');
const verifyId = require("../middlewares/verifyID");

//Weight
const getSingleWeight = async (req, res) => {
    try {
        const user = await User.findOne({login: req.user}, {weightHistory: 1});
        const weightEntry = user.weightHistory.find(obj => obj._id.equals(req.body.id));
        if (!weightEntry) return res.sendStatus(204) //no content
        res.json(weightEntry);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};
const updateWeight = async (req, res) => {

};
const removeWeight = async (req, res) => {
};


const getAll = async (req, res) => {
    try {
        const user = await User.findOne({login: req.user}, {weightHistory: 1});
        res.json(user.weightHistory);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};
const getInfo = async (req, res) => {
};
const addInfo = async (req, res) => {
};
const updateInfo = async (req, res) => {
};
const getAuth = async (req, res) => {
    try {
        const user = await User.findOne({login: req.user}, {login: 1});
        res.json(user);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};
const changeAuth = async (req, res) => {
        let {password} = req.body;
        if (!req?.body?.password) return res.status(400).json({message: "Password is required"});
        password = password.trim();
        if (password.includes(' ') || password.length < 4 || typeof password !== 'string') {
            return res.status(400).json({
                message: "Invalid password",
                tipLength: "Password must be at least 4 characters long",
                tipSpace: "Password must not contain spaces",
                tipType: "Password must be a string"
            });
        }
        try {
            const user = await User.findOne({login: req.user}, {password: 1});
            const hashedPassword = await bcrypt.hash(password, 14);
            user.password = password ? String(hashedPassword) : user.password;
            const result = await user.save()
            res.json({message: "New password has been set"});
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }
;


module.exports = {
    getSingleWeight: [verifyId, getSingleWeight],
    updateWeight: [verifyId, updateWeight],
    removeWeight: [verifyId, removeWeight],
    getAll,
    getInfo,
    addInfo,
    updateInfo,
    getAuth,
    changeAuth
}