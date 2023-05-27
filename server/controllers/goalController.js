const User = require('../models/User');
const verifyId = require("../middlewares/verifyID");
const {bodyParamsSchema} = require("../models/BodyParams"); // maybe won't be useful

//bodyParameters
const params = Object.keys(bodyParamsSchema.obj);


const getGoals = async (req, res) => {
    try {
        const user = await User.findOne({login: req.user}, {goals: 1});
        res.json(user.goals);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};
const getGoal = async (req, res) => {
    try {
        const user = await User.findOne({login: req.user}, {goals: 1});
        const goal = user.goals.find(obj => obj._id.equals(req.body.id));
        if (!goal) return res.sendStatus(204) //no content
        res.json(goal);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};
//max 3 goals
const createGoal = async (req, res) => {
    const {category, exercise, bodyParameter, currentValue, endValue} = req.body;
    if (!req?.body?.category || !req?.body?.endValue || currentValue === undefined) {
        return res.status(400).json({message: "category, endValue and currentValue are required"});
    }
    // if(['weight', 'load', 'workoutCount', 'measurement'].category)
    if (category === "load" && !req?.body?.exercise) {
        return res.status(400).json({message: "exercise is required"});
    }


    if (category === "measurement" && !req?.body?.bodyParameter || !params.includes(bodyParameter)) {
        return res.status(400).json({message: "bodyParameter is required or invalid"});
    }
    if ((typeof currentValue !== 'number' && Number.isNaN(currentValue)) || (typeof endValue !== 'number' && Number.isNaN(endValue) && endValue < currentValue))
        return res.status(400).json({message: "Goal values are invalid"});
    try {
        const user = await User.findOne({login: req.user}, {goals: 1});
        if(user.goals.filter(obj => !obj.finished).length === 3) {
            return res.status(406).json({message: "You can have only 3 unfinished goals"});
        }
        if(exercise && user.goals.findIndex(obj => obj.exercise === exercise) !== -1) {
           return  res.status(406).json({message: "Goal with this exercise already exists"});
        }
        if(bodyParameter && user.goals.findIndex(obj => obj.bodyParameter === bodyParameter) !== -1) {
            return res.status(406).json({message: "Goal with this bodyParameter already exists"});
        }
        const newGoal = {
            category: String(category),
            exercise: (exercise && category === 'measurement') ? String(exercise) : undefined,
            bodyParameter: (bodyParameter && category === 'measurement')? String(bodyParameter) : undefined,
            currentValue : currentValue ? currentValue : 0,
            endValue
        }
        user.goals = [...user.goals, newGoal];
        const result = await user.save();
        res.json(result);

    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }

};
const updateGoal = async (req, res) => {
    const {endValue} = req.body;
    if (!req?.body?.endValue ) return res.status(400).json({message: "endValue is required"});
    if (typeof endValue !== 'number' && Number.isNaN(endValue))
        return res.status(400).json({message: "endValue is invalid"});
    try {
        const user = await User.findOne({login: req.user}, {goals: 1});
        const goal = user.goals.find(obj => obj._id.equals(req.body.id));
        goal.endValue = endValue;
        const result = await user.save();
        res.json(result);

    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }

};
const removeGoal = async (req, res) => {
    try {
        const user = await User.findOne({login: req.user}, {goals: 1});
        const goal = user.goals.find(obj => obj._id.equals(req.body.id));
        if (!goal) return res.sendStatus(204) //no content
        user.goals = user.goals.filter(obj => !obj.equals(goal));
        await user.save();
        res.json({message: "Entry deleted"});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
};


module.exports = {
    getGoals,
    getGoal: [verifyId, getGoal],
    createGoal,
    updateGoal: [verifyId, updateGoal],
    removeGoal: [verifyId, removeGoal]
}