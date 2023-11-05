const User = require('../models/User');
const bcrypt = require('bcrypt');
const verifyId = require("../middlewares/verifyID");
const pagination = require("../utils/transformToPagination");

const dateYearFormatter = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
    });

//Weight
const getLatestWeight = async (req, res) => {
    try {

        const user = await User.findOne({login: req.user}, {weightHistory: 1});
        const weightEntry = user.weightHistory[user.weightHistory.length - 1];
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
            let goalMessage;
            const user = await User.findOne({login: req.body.user}, {weightHistory: 1, goals: 1});
            const weightEntry = user.weightHistory.find(obj => obj._id.equals(req.body.id));
            if (!weightEntry) return res.sendStatus(204) //no content

            //update goal
            const weightGoal = user.goals.find(obj => ((obj.category.includes('weight')) && !obj.finished));
            console.log(weightGoal)
            if (weightGoal && weightEntry.weight === weightGoal.currentValue) {
                if (weightGoal.category === 'weightDown' && weight <= weightGoal.endValue) {
                    weightGoal.finished = true;
                    goalMessage = {
                        message: 'Goal has been achieved!',
                        goal: weightGoal,
                    }
                }
                if (weightGoal.category === 'weightUp' && weight >= weightGoal.endValue) {
                    weightGoal.finished = true;
                    goalMessage = {
                        message: 'Goal has been achieved!',
                        goal: weightGoal,
                    }
                }
            }
            if(weightGoal) weightGoal.currentValue = weight;
            weightEntry.weight = weight ? weight : weightEntry.weight;
            const result = await user.save();
            res.json({
                message: "Weight in entry updated",
                id: weightEntry._id,
                goalMessage,
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
        let goalMessage;
        if (weightGoal && weightEntry.weight === weightGoal.currentValue) {
            const lastWeight = user.weightHistory[user.weightHistory.length - 1].weight;
            console.log(lastWeight)
            weightGoal.currentValue = lastWeight;
            if (weightGoal.category === 'weightDown' && lastWeight <= weightGoal.endValue) {
                weightGoal.finished = true;
                goalMessage = {
                    message: 'Goal has been achieved!',
                    goal: weightGoal,
                }
            }
            if (weightGoal.category === 'weightUp' && lastWeight >= weightGoal.endValue) {
                weightGoal.finished = true;
                goalMessage = {
                    message: 'Goal has been achieved!',
                    goal: weightGoal,
                }
            }
        }
        await user.save();
        res.json({message: "Entry deleted", goalMessage});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
};


const getAll = async (req, res) => {
    const {limit,skip} = req.params;
    try {
        const user = await User.findOne({login: req.query.user}, {weightHistory: 1});
        res.json({data: pagination(user.weightHistory.reverse(), limit, skip), count: user.weightHistory.length});
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
            {$project: {email: 1, username: 1, gender: 1, age: 1, height: 1}},
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
        let goalMessage;
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
        //if weight added in the same day, delete rest dates from the same day
        const currentDay = dateYearFormatter(new Date());
        const differentDayEntries = user.weightHistory.filter(entry => {
            return !(currentDay === dateYearFormatter(entry.date))

        })


        if(weight) {
            user.weightHistory = [...differentDayEntries, {weight}];
        } else {
            user.weightHistory = [...user.weightHistory];
        }
        const weightGoal = user.goals.find(obj => ((obj.category.includes('weight')) && !obj.finished));
        // console.log(weightGoal)
        if (weightGoal?.category === 'weightUp' && weightGoal) {
            if (weight >= weightGoal.endValue) {
                weightGoal.finished = true;
                goalMessage = {
                    message: 'Goal has been achieved!',
                    goal: weightGoal,
                }
            }
            weightGoal.currentValue = weight;

            // weightGoal.currentValue = weight > weightGoal.currentValue ? weight : weightGoal.currentValue;
        }
        if (weightGoal?.category === 'weightDown' && weightGoal) {
            if (weight <= weightGoal.endValue) {
                weightGoal.finished = true;
                goalMessage = {
                    message: 'Goal has been achieved!',
                    goal: weightGoal,
                }

            }
            weightGoal.currentValue = weight;

            // weightGoal.currentValue = weight < weightGoal.currentValue ? weight : weightGoal.currentValue;
        }
        // console.log(user.weightHistory)
        const result = await user.save();
        res.json({user, goalMessage});
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
    getSingleWeight: getLatestWeight,
    updateWeight: [verifyId, updateWeight],
    removeWeight,
    // removeWeight: [verifyId, removeWeight],
    getAll,
    getInfo,
    updateInfo,
    getAuth,
    changeAuth
}