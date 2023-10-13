const User = require('../models/User');
const bcrypt = require('bcrypt');
const verifyId = require("../middlewares/verifyID");
const pagination = require("../utils/transformToPagination");

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
        const {weight} = req.body;
        if (weight && (typeof weight !== 'number' || Number.isNaN(weight) || weight <= 0)) {
            return res.status(400).json({message: "Invalid weight",});
        }
        try {
            const user = await User.findOne({login: req.body.user}, {weightHistory: 1, goals: 1});
            const weightEntry = user.weightHistory.find(obj => obj._id.equals(req.body.id));
            if (!weightEntry) return res.sendStatus(204) //no content

            //update goal
            const weightGoal = user.goals.find(obj => ((obj.category.includes('weight')) && !obj.finished));
            console.log(weightGoal)
            if (weightGoal && weightEntry.weight === weightGoal.currentValue) {
                if (weightGoal.category === 'weightDown' && weight <= weightGoal.endValue) {
                    weightGoal.finished = true;
                }
                if (weightGoal.category === 'weightUp' && weight >= weightGoal.endValue) {
                    weightGoal.finished = true;
                }
            }
            if(weightGoal) weightGoal.currentValue = weight;
            weightEntry.weight = weight ? weight : weightEntry.weight;
            const result = await user.save();
            res.json({
                message: "Weight in entry updated",
                id: weightEntry._id
            });
        } catch
            (e) {
            res.status(500).json({message: e.message});
        }
    }
;
const removeWeight = async (req, res) => {
    try {
        const user = await User.findOne({login: req.query.user}, {weightHistory: 1, goals: 1});
        const weightEntry = user.weightHistory.find(obj => obj._id.equals(req.query.id));
        if (!weightEntry) return res.sendStatus(204) //no content
        user.weightHistory = user.weightHistory.filter(obj => !obj.equals(weightEntry));
        const weightGoal = user.goals.find(obj => ((obj.category.includes('weight')) && !obj.finished));
        if (weightGoal && weightEntry.weight === weightGoal.currentValue) {
            const maxWeight = user.weightHistory.reduce((prev, curr) => new Date(curr.date) > new Date(prev.date) ? curr : prev);
            weightGoal.currentValue = maxWeight.weight;
            if (weightGoal.category === 'weightDown' && maxWeight.weight <= weightGoal.endValue) {
                weightGoal.finished = true;
            }
            if (weightGoal.category === 'weightUp' && maxWeight.weight >= weightGoal.endValue) {
                weightGoal.finished = true;
            }
        }

        await user.save();
        res.json({message: "Entry deleted"});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
};


const getAll = async (req, res) => {
    const {limit,skip} = req.params;
    try {
        const user = await User.findOne({login: req.query.user}, {weightHistory: 1});
        res.json(pagination(user.weightHistory, limit, skip));
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};
const getInfo = async (req, res) => {
    try {
        //newest weight
        const user = await User.aggregate([
            {$match: {login: req.user}},
            {$unwind: "$weightHistory"},
            {$sort: {"weightHistory.date": -1}},
            {$project: {email: 1, username: 1, gender: 1, age: 1, height: 1, weightHistory: 1}},
            {$limit: 1}
        ]);
        res.json({user});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

const updateInfo = async (req, res) => {
    const {email, username, gender, age, height, weight} = req?.body;

    if ((typeof email !== 'string' || !new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) && email) {
        return res.status(400).json({message: "Invalid email"});
    }
    if (username && (username.length < 4 || typeof username !== 'string')) {
        return res.status(400).json({message: "Invalid password",});
    }
    if (gender && (typeof gender !== 'string' || !['female', 'male'].includes(gender))) {
        return res.status(400).json({message: "Invalid gender",});
    }
    if (age && (typeof age !== 'number' || Number.isNaN(age) || age % 1 !== 0 || age <= 0 || age >= 100)) {
        return res.status(400).json({message: "Invalid age",});
    }
    if (height && (typeof height !== 'number' || Number.isNaN(height) || height % 1 !== 0 || height <= 0)) {
        return res.status(400).json({message: "Invalid height",});
    }
    if (weight && (typeof weight !== 'number' || Number.isNaN(weight) || weight <= 0)) {
        return res.status(400).json({message: "Invalid weight",});
    }
    try {
        const user = await User.findOne({login: req.user}, {
            email: 1,
            username: 1,
            gender: 1,
            age: 1,
            height: 1,
            weightHistory: 1,
            goals: 1,
        });
        user.email = email ? email : user.email;
        user.username = username ? username.trim() : user.username;
        user.gender = gender ? gender.trim() : user.gender;
        user.age = age ? age : user.age;
        user.height = height ? height : height;
        user.weightHistory = [...user.weightHistory, {weight}];
        const weightGoal = user.goals.find(obj => ((obj.category.includes('weight')) && !obj.finished));
        if (weightGoal?.category === 'weightUp' && weightGoal) {
            if (weight >= weightGoal.endValue) weightGoal.finished = true;
            weightGoal.currentValue = weight > weightGoal.currentValue ? weight : weightGoal.currentValue;
        }
        if (weightGoal?.category === 'weightDown' && weightGoal) {
            if (weight <= weightGoal.endValue) weightGoal.finished = true;
            weightGoal.currentValue = weight < weightGoal.currentValue ? weight : weightGoal.currentValue;
        }
        const result = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};
const getAuth = async (req, res) => {
    try {
        const user = await User.findOne({login: req.query.user}, {login: 1});
        console.log(user)
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
    removeWeight,
    // removeWeight: [verifyId, removeWeight],
    getAll,
    getInfo,
    updateInfo,
    getAuth,
    changeAuth
}