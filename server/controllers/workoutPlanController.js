const User = require('../models/User');
const WorkoutPlan = require('../models/WorkoutPlan');
const verifyId = require("../middlewares/verifyID");
const verifyRoutineId = require("../middlewares/verifyRoutineID");

const getPlan = async (req, res) => {
    const {id} = req.query;
    try {
        const {_id: userId} = await User.findOne({login: req.query.user}, {_id: 1});
        const plan = await WorkoutPlan.findOne({user: userId, _id: id}, {user: 0});
        if (!plan) res.sendStatus(204)
        else {
            res.json(plan);
        }
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
        if (duplicate.length) return res.status(409).json({message: "Plan with this name already exists!"});
        const workoutPlan = await WorkoutPlan.create({
            user: userId,
            name: String(name),
            description: description ? String(description) : undefined,
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
        const plan = await WorkoutPlan.findOne({user: userId, _id: id}, {user: 0, workoutRoutine: 0});
        if (!plan) res.sendStatus(204);
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
        if (!result.deletedCount) return res.sendStatus(204);
        res.json(result);
    } catch (e) {
        res.status(500).json({message: e.message});
    }

}
const getAllPlans = async (req, res) => {
    try {
        const {_id: userId} = await User.findOne({login: req.query.user}, {_id: 1});
        const plans = await WorkoutPlan.find({user: userId}, {user: 0, workoutRoutine: 0});
        if (!plans.length) res.sendStatus(204);
        else {
            console.log(plans)
            res.json(plans);
        }
    } catch (e) {
        res.status(500).json({message: e.message});
    }

}

const getRoutine = async (req, res) => {
    const {id, routineId} = req.body;
    try {
        const {_id: userId} = await User.findOne({login: req.query.user}, {_id: 1});
        const plan = await WorkoutPlan.findOne({user: userId, _id: id});
        if (!plan) return res.sendStatus(204); // no workoutPlan
        const routine = plan.workoutRoutine.find(obj => obj._id.equals(routineId));
        res.json(routine);
        // res.json(plan);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
const addRoutine = async (req, res) => {
    const {name, days, note, id, exercises} = req.body;
    if (!req?.body?.name) {
        return res.status(400).json({message: 'Name is required'});
    }
    if (req?.body?.days && !(days instanceof Array)) {
        return res.status(400).json({message: "Days must be an array"})
    }
    if (days && !days.some(day => !Number.isInteger(day) || day <= 0 || day > 6)) {

        return res.status(400).json({message: "Invalid array's items value "})
    }
    if (exercises && !(exercises instanceof Array)) return res.status(400).json({message: "Exercises should be stored in Array "})

    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const plan = await WorkoutPlan.findOne({user: userId, _id: id}, {workoutRoutine: 1});
        if (!plan) res.sendStatus(204); // no workoutPlan
        const newRoutine = {
            name: String(name).trim(),
            days,
            note: note ? String(note) : undefined,
            //exercises validation will happen in frontEnd
            exercises,
        }
        plan.workoutRoutine = [...plan.workoutRoutine, newRoutine];
        const result = await plan.save();
        res.json(plan.workoutRoutine)
    } catch (e) {
        res.status(500).json({message: e.message});
    }

}
const updateRoutine = async (req, res) => {
    const {name, days, note, id, routineId, exercises} = req.body;
    if (req?.body?.days && !(days instanceof Array)) {
        return res.status(400).json({message: "Days must be an array"})
    }
    if (days && !days.some(day => !Number.isInteger(day) || day <= 0 || day > 6)) {
        return res.status(400).json({message: "Invalid array's items value "})
    }
    if (exercises && !(exercises instanceof Array)) return res.status(400).json({message: "Exercises should be stored in Array "})

    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const plan = await WorkoutPlan.findOne({user: userId, _id: id}, {workoutRoutine: 1});
        if (!plan) return res.sendStatus(204); // no workoutPlan

        const routine = plan.workoutRoutine.find(obj => obj._id.equals(routineId))
        if (!routine) return res.sendStatus(204);
        routine.name = name ? String(name) : routine.name;
        routine.note = note ? String(note) : routine.note;
        routine.days = days ? days : routine.days;
        //user will send previous exercises with changes being made
        routine.exercises = exercises ? exercises : routine.exercises;

        const result = await plan.save();
        res.json(routine)
    } catch
        (e) {
        res.status(500).json({message: e.message});
    }
}
const removeRoutine = async (req, res) => {
    const {id, routineId} = req.body;
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const plan = await WorkoutPlan.findOne({user: userId, _id: id});
        if (!plan) return res.sendStatus(204); // no workoutPlan
        const routine = plan.workoutRoutine.find(obj => obj._id.equals(routineId));
        if (!routine) return res.sendStatus(204);
        plan.workoutRoutine = plan.workoutRoutine.filter(obj => obj !== routine);
        await plan.save();
        res.json(plan.workoutRoutine);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


module.exports = {
    // getPlan: [verifyId, getPlan],
    getPlan,
    addPlan,
    updatePlan: [verifyId, updatePlan],
    removePlan: [verifyId, removePlan],
    getAllPlans,
    // getRoutine: [verifyId, verifyRoutineId, getRoutine],
    getRoutine,
    addRoutine: [verifyId, addRoutine],
    updateRoutine: [verifyId, verifyRoutineId, updateRoutine],
    removeRoutine: [verifyId, verifyRoutineId, removeRoutine]
}