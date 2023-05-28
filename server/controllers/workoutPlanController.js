const User = require('../models/User');
const WorkoutPlan = require('../models/WorkoutPlan');
const verifyId = require("../middlewares/verifyID");

const getPlan = async (req, res) => {
    const {id} = req.body;
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const plan = await WorkoutPlan.findOne({user: userId, _id: id},{user: 0, workoutRoutine: 0} );
        if(!plan) res.sendStatus(204);
        res.json(plan);
    } catch (e) {
        res.status(500).json({message: e.message});
    }


}
const addPlan = async (req, res) => {
    const {name, description} = req.body;
    if (!req?.body?.name) {
        return res.status(400).json({message: 'Name is required'});
    }
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const userPlans = await WorkoutPlan.find({user: userId});
        const duplicate = userPlans.filter(obj => obj.name === name);
        if(duplicate.length) return res.status(409).json({message: "Plan with this name already exists!"});
        const workoutPlan = await WorkoutPlan.create({
                user: userId,
                name: String(name),
                description: description ?String(description) : undefined,
            })

        res.json(workoutPlan);

    } catch (e) {
        res.status(500).json({message: e.message});
    }

}
const updatePlan = async (req, res) => {
    const {id} = req.body;
    const {name, description} = req.body;
    if (!req?.body?.name) {
        return res.status(400).json({message: 'Name is required'});
    }
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const plan = await WorkoutPlan.findOne({user: userId, _id: id},{user: 0, workoutRoutine: 0} );
        if(!plan) res.sendStatus(204);
        plan.name = String(name);
        plan.description = description;
        const result = await plan.save();
        res.json(result);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
const removePlan = async (req, res) => {
    const {id} = req.body;
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const result = await WorkoutPlan.deleteOne({user: userId, _id: id});
        if(!result.deletedCount) res.sendStatus(204);
        res.json(result);
    } catch (e) {
        res.status(500).json({message: e.message});
    }

}
const getAllPlans = async (req, res) => {
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const plans = await WorkoutPlan.find({user: userId},{user: 0, workoutRoutine: 0} );
        if(!plans.length) res.sendStatus(204);
        res.json(plans);
    } catch (e) {
        res.status(500).json({message: e.message});
    }

}
const getRoutine = async (req, res) => {
}
const addRoutine = async (req, res) => {
}
const updateRoutine = async (req, res) => {
}
const removeRoutine = async (req, res) => {
}


module.exports = {
    getPlan: [verifyId, getPlan],
    addPlan,
    updatePlan: [verifyId, updatePlan],
    removePlan: [verifyId, removePlan],
    getAllPlans,
    getRoutine: [verifyId, getRoutine],
    addRoutine,
    updateRoutine: [verifyId, updateRoutine],
    removeRoutine: [verifyId, removeRoutine]
}