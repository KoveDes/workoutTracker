const CustomExercise = require('../models/CustomExercise');
const User = require('../models/User');
const mongoose = require("mongoose");

const verifyId = (req,res,next) => {
    if (!req?.body?.id) {
        return res.status(400).json({message: "ID is required"});
    }
    req.body.id = new mongoose.Types.ObjectId(req.body.id);
    next();

}

const getAll = async (req, res) => {
    try {
        const exercises = await User.findOne({login: req.user}, {customExercises: 1});
        res.json(exercises.customExercises);

    } catch (e) {
        res.status(500).json({message: e.message});
    }

}
const getSingle = async (req, res) => {
    let {id} = req.body;

    try {
        const user = await User.findOne({login: req.user});
        const exercise = user.customExercises.find(obj => {
            return  obj._id.equals(req.body.id);
        });
        if (!exercise) {
            return res.sendStatus(204); //no content
        }

        res.json(exercise);
    } catch (e) {
        res.status(500).json({message: e.message});
    }

}
const create = async (req, res) => {
    const {name, active: activeMuscles, equipment, primary: primaryMuscle} = req.body;
    if(!req?.body?.name || !req?.body?.active|| !req?.body?.primary) {
        return res.status(400).json({message: 'Required parameters are missing'});
    }


    if(!(activeMuscles instanceof Array)) return res.status(400).json({message: "'active' must be an array"})
    try {
        const user = await User.findOne({login: req.user}, {customExercises: 1});
        //TODO sprawdzic czy znajduja się w liscie miesni (enum?)
        const exercise = {
            name: name.trim(),
            activeMuscles: activeMuscles.map(muscle => muscle.trim().toLowerCase()),
            equipment,
            primaryMuscle: primaryMuscle.trim().toLowerCase(),
        };
        user.customExercises = [...user.customExercises, exercise];
        const result = await user.save();
        res.json(result);
    }
     catch (e) {
         res.status(500).json({message: e.message});
     }


}
const update = async (req, res) => {
    const {name, active: activeMuscles, equipment, primary: primaryMuscle} = req.body;
    try {
        const user = await User.findOne({login: req.user}, {customExercises: 1});
        //TODO sprawdzic czy znajduja się w liscie miesni (enum?)
        const exercise = user.customExercises.find(obj => {
            return  obj._id.equals(req.body.id);
        });
        console.log(exercise)
        if(!exercise) {
            return res.sendStatus(204); //no content
        }
        const updatedProperties = {
            name: name? name.trim() : exercise.name,
            activeMuscles: activeMuscles ? activeMuscles.map(muscle => muscle.trim().toLowerCase()) : exercise.activeMuscles,
            equipment: equipment? equipment.toLowerCase() : exercise.equipment,
            primaryMuscle: primaryMuscle ? primaryMuscle.trim().toLowerCase() : exercise.primaryMuscle,

        };
        user.customExercises = user.customExercises.map(obj => {
           return obj.equals(exercise) ? {...obj, ...updatedProperties} : obj; //don't change obj's ID
        });
        const result = await user.save();
        res.json(result);
    }
    catch (e) {
        res.status(500).json({message: e.message});
    }

}
const remove = async (req, res) => {
    try {
        const user = await User.findOne({login: req.user});
        const exercise = user.customExercises.find(obj => {
            return  obj._id.equals(req.body.id);
        });
        if (!exercise) {
            return res.sendStatus(204); //no content
        }
        user.customExercises = user.customExercises.filter(obj => !obj.equals(exercise));
        const result = await user.save();
        res.json(result);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

module.exports = {getAll, getSingle: [verifyId,getSingle], create, update: [verifyId, update], remove: [verifyId, remove]};