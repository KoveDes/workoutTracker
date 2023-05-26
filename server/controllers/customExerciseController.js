const CustomExercise = require('../models/CustomExercise');
const User = require('../models/User');
const mongoose = require("mongoose");


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
    if (!req?.body?.id) {
        return res.status(400).json({message: "ID is required"});
    }
    try {
        const user = await User.findOne({login: req.user});
        const exercise = user.customExercises.find(obj => {
            return  obj._id.equals(new mongoose.Types.ObjectId(id));
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
    //name
    // activeMuscles []
    //equipment
    //primaryMuscle


}
const update = async (req, res) => {
}
const remove = async (req, res) => {
    let {id} = req.body;
    if (!req?.body?.id) {
        return res.status(400).json({message: "ID is required"});
    }
    try {
        const user = await User.findOne({login: req.user});
        const exercise = user.customExercises.find(obj => {
            return  obj._id.equals(new mongoose.Types.ObjectId(id));
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

module.exports = {getAll, getSingle, create, update, remove};