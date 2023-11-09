const User = require('../models/User');
const verifyId = require("../middlewares/verifyID");
const {bodyParamsSchema} = require("../models/BodyParams");
const pagination = require("../utils/transformToPagination"); // maybe won't be useful

//bodyParameters
const params = Object.keys(bodyParamsSchema.obj);


const getGoals = async (req, res) => {
    const {current} = req.query;
    const {limit, skip} = req.params;
    try {
        const user = await User.findOne({login: req.user}, {goals: 1});
        //pagination
        const result = pagination(user.goals, limit, skip)
        if (current === 1) return res.json(pagination(user.goals.filter(obj => !obj.finished),limit,skip ))
        if (current === 0) return res.json(pagination(user.goals.filter(obj => obj.finished),limit,skip ));
        res.json(result);
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
//max 4 goals
const createGoal = async (req, res) => {
    const {category, exercise, bodyParameter, currentValue, endValue} = req.body;
    if (!req?.body?.category || !req?.body?.endValue || currentValue === undefined) {
        return res.status(400).json({message: "category, endValue and currentValue are required"});
    }
    if (category === "load" && !req?.body?.exercise) {
        return res.status(400).json({message: "exercise is required"});
    }
    if (category === "measurement" && (!req?.body?.bodyParameter || !params.includes(bodyParameter))) {
        return res.status(400).json({message: "bodyParameter is required or invalid"});
    }
    if ((typeof currentValue !== 'number' && Number.isNaN(currentValue)) || (typeof endValue !== 'number' && Number.isNaN(endValue))) {
    }
    if (category === 'weightDown' && endValue > currentValue)
        return res.status(400).json({message: "Goal values are invalid"});
    if (category === 'weighUp' && endValue < currentValue)
        return res.status(400).json({message: "Goal values are invalid"});


    try {
        const user = await User.findOne({login: req.user}, {goals: 1});
        if (user.goals.filter(obj => !obj.finished).length === 4) {
            return res.status(406).json({message: "You can have only 4 unfinished goals"});
        }
        if (exercise && user.goals.find(obj => (obj.category === 'load' && !obj.finished))) {
            return res.status(406).json({message: "Load goal already exists"});
        }
        if (bodyParameter && user.goals.find(obj => (obj.category === 'measurement' && !obj.finished))) {
            return res.status(406).json({message: "Measurement goal already exists"});
        }
        if (category === "workoutCount" && user.goals.find(obj => (obj.category === 'workoutCount' && !obj.finished))) {
            return res.status(406).json({message: "Workout count goal already exists"});
        }
        if (category.includes('weight') && user.goals.find(obj => (obj.category.includes('weight') && !obj.finished))) {
            return res.status(406).json({message: "Weight goal already exists"});
        }

        const newGoal = {
            category: String(category),
            exercise: (exercise && category === 'load') ? String(exercise) : undefined,
            bodyParameter: (bodyParameter && category === 'measurement') ? String(bodyParameter) : undefined,
            currentValue: currentValue ? currentValue : 0,
            endValue
        }
        user.goals = [...user.goals, newGoal];
        console.log(user)
        const result = await user.save();
        res.json(newGoal);

    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }

};
const updateGoal = async (req, res) => {
    const {endValue} = req.body;
    if (!req?.body?.endValue) return res.status(400).json({message: "endValue is required"});
    if (typeof endValue !== 'number' && Number.isNaN(endValue))
        return res.status(400).json({message: "endValue is invalid"});
    try {
        const user = await User.findOne({login: req.user}, {goals: 1});
        const goal = user.goals.find(obj => obj._id.equals(req.body.id));
        if (goal.finished) {
            return res.status(406).json({message: "You can't update finished goal!"});
        }
        if (endValue >= goal.currentValue && goal.category === 'weightDown') {
            return res.status(406).json({message: "You can't finish goal this way!"});
        }
        if (endValue <= goal.currentValue && goal.category !== 'weightDown') {
            return res.status(406).json({message: "You can't finish goal this way!"});
        }
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
        const user = await User.findOne({login: req.query.user}, {goals: 1});
        const goal = user.goals.find(obj => obj._id.equals(req.query.id));
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
    removeGoal,
}