const verifyId = require("../middlewares/verifyID");
const User = require('../models/User');
const Workout = require('../models/Workout');

const getWorkouts = async (req, res) => {
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const workouts = await Workout.find({user: userId}, {user: 0});
        if (!workouts.length) return res.sendStatus(204);
        res.json(workouts);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
const getWorkout = async (req, res) => {
    const {id: workoutId} = req.body;
    console.log(workoutId);
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const workout = await Workout.findOne({user: userId, _id: workoutId}, {user: 0});
        if (!workout) return res.sendStatus(204);
        res.json(workout);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
const saveWorkout = async (req, res) => {
    const {note, exercises} = req.body;
    if (!req?.body?.exercises || !(exercises instanceof Array)) {
        return res.status(400).json({message: 'Exercises are missing or are not an Array'});
    }
    if (!exercises.every(ex => ex.sets)) return res.status(400).json({message: 'Sets are required'});
    //Other exercises validation will happen in FrontEnd
    try {
        let goalMessage;
        const user = await User.findOne({login: req.user}, {goals: 1});
        //GOAL category === workoutCount
        const workoutCountGoal = user.goals.find(goal => (goal.category === "workoutCount" && !goal.finished));
        if (workoutCountGoal) {
            workoutCountGoal.currentValue++;
            if (workoutCountGoal.currentValue >= workoutCountGoal.endValue) {
                workoutCountGoal.finished = true;
                goalMessage = {
                    message: "Goal has been achieved!",
                    goal: workoutCountGoal
                }
            }
        }
        //GOAL category === load
        const loadGoal = user.goals.find(goal => (goal.category === "load" && !goal.finished));
        const goalExercise = exercises.filter(obj => obj.name === loadGoal.exercise)[0];
        if (loadGoal && goalExercise) {
            //get bes load of the exercises
            const {load: bestLoad} = goalExercise.sets.reduce((prev, curr) => {
                return (curr.load > prev.load) ? curr : prev;
            });
            if (bestLoad > loadGoal.currentValue) loadGoal.currentValue = bestLoad;
            if (loadGoal.currentValue >= loadGoal.endValue) {
                loadGoal.finished = true;
                goalMessage = {
                    message: "Goal has been achieved!",
                    goal: loadGoal
                }
            }
        }
        await user.save();
        const workout = await Workout.create({
            user: user._id,
            note : note ? String(note) : undefined,
            exercises,
        })
        res.json({workout, goalMessage})

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
const removeWorkout = async (req, res) => {
    const {id: workoutId} = req.body;
    console.log(workoutId);
    try {
        //Goals don't need to be updated
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const deleted = await Workout.deleteOne({user: userId, _id: workoutId});
        if (!deleted.deletedCount) return res.sendStatus(204) //nothing has been deleted
        res.json(deleted);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


module.exports = {
    getWorkouts,
    getWorkout: [verifyId, getWorkout],
    saveWorkout,
    removeWorkout: [verifyId, removeWorkout]
}