const CustomExercise = require('../models/CustomExercise');
const User = require('../models/User');
const verifyId = require("../middlewares/verifyID");


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
    const {name, active: activeMuscles, equipment, primary: primaryMuscle, url} = req.body;
    if(!req?.body?.name || !req?.body?.active|| !req?.body?.primary) {
        return res.status(400).json({message: 'Required parameters are missing'});
    }
    //check if url is png,jpg, jpeg or gif file
    // if(!new RegExp(/.(png|jpe?g|gif)$/i).test(url)) {
    //     return res.status(400).json({message: "URL should contain image in .png | .jpg | .jpeg | .gif format"})
    // }

    if(!(activeMuscles instanceof Array)) return res.status(400).json({message: "'activeMuscles' must be an array"})
    try {
        const user = await User.findOne({login: req.user}, {customExercises: 1});
        const exercise = {
            name: String(name.trim()),
            url: String(url),
            activeMuscles: activeMuscles.map(muscle => muscle.trim().toLowerCase()),
            equipment,
            primaryMuscle: String(primaryMuscle).trim().toLowerCase(),
        };
        if(user.customExercises.find(ex => ex.name === name)) {
            return res.status(400).json({message: 'Exercise with this name already exists!'});
        }

        user.customExercises = [...user.customExercises, exercise];
        const result = await user.save();
        res.json(result);
    }
     catch (e) {
         res.status(500).json({message: e.message});
     }


}
const update = async (req, res) => {
    const {name, active: activeMuscles, equipment, primary: primaryMuscle, url} = req.body;
    //check if url is png,jpg, jpeg or gif file
    if(!new RegExp(/.(png|jpe?g|gif)$/i).test(url) && url) {
        return res.status(400).json({message: "URL should contain image in .png | .jpg | .jpeg | .gif format"})
    }

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
            name: name? String(name.trim()) : exercise.name,
            url: url ? String(url) : exercise.url,
            activeMuscles: activeMuscles ? activeMuscles.map(muscle => muscle.trim().toLowerCase()) : exercise.activeMuscles,
            equipment: equipment? String(equipment).toLowerCase() : exercise.equipment,
            primaryMuscle: primaryMuscle ? String(primaryMuscle).trim().toLowerCase() : exercise.primaryMuscle,

        };
        if(user.customExercises.find(ex => ex.name === name)) {
            return res.status(400).json({message: 'Exercise with this name already exists!'});
        }
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
            return  obj._id.equals(req.query.id);
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

module.exports = {getAll, getSingle: [verifyId,getSingle], create, update: [verifyId, update], remove};