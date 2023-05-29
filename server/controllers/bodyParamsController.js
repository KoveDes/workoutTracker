const User = require('../models/User');
const {bodyParamsSchema} = require("../models/BodyParams");
const mongoose = require("mongoose");
const verifyId = require("../middlewares/verifyID");


const getLatestAll = async (req, res) => {
    //lista parametrów
    const params = Object.keys(bodyParamsSchema.obj);
    const pipeline = [
        {$match: {login: req.user}}
    ];
    //Dla każdego parametru zwróc najnowszy wynik
    params.forEach(param => {
        //param Array deconstruction: [{},{}] => {},{}
        const unwind = {
            $unwind: {
                path: `$bodyParameters.${param}`,
                preserveNullAndEmptyArrays: true
            }
        };
        //1st element is the newest
        const sort = {
            $sort: {[`bodyParameters.${param}.date`]: -1}
        };

        pipeline.push(unwind, sort);
    });
    //add projection
    pipeline.push({$project: {_id: 0, bodyParameters: 1}});
    try {
        const latestSizes = await User.aggregate(pipeline).exec();
        res.json(latestSizes[0]);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}


const paramExists = (req, res, next) => {
    const params = Object.keys(bodyParamsSchema.obj);
    if (params.includes(req.params.param)) {
        next()
    } else {
        res.status(400).json({
            message: "Invalid body parameter"
        })
    }
}


const getMeasurement = async (req, res) => {
    const {param} = req.params;
    try {
        const user = await User.findOne({login: req.user},
            {[`bodyParameters.${param}`]: 1, _id: 0,}
        );

        res.json(user.bodyParameters[param]);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const addMeasurement = async (req, res) => {
    const {param} = req.params;
    const {size} = req.body;
    if (!req?.body?.size || typeof req.body.size !== 'number') {
        return res.status(400).json({message: "Size is required or is not a number"});
    }
    try {
        let goalMessage;
        const user = await User.findOne({login: req.user});
        user.bodyParameters[param] = [...user.bodyParameters[param], {size}];
        //if user edited only the last
        const measurementGoal = user.goals.find(obj => (obj.bodyParameter === String(param) && !obj.finished));
        if (measurementGoal) {
            if (size >= measurementGoal.currentValue) measurementGoal.currentValue = size;
            if (size >= measurementGoal.endValue) {
                measurementGoal.finished = true;
                goalMessage = {
                    message: "Goal has been achieved!",
                    goal: measurementGoal
                }
            }
        }
        const paramArr = user.bodyParameters[param];
        const result = await user.save();            //save in database
        res.json({paramArr, goalMessage});
    } catch
        (e) {
        res.status(500).json({message: e.message});
    }
}

const changeMeasurement = async (req, res) => {
    const {param} = req.params;
    let {id, size} = req.body;
    if (!req?.body?.size || typeof req.body.size !== 'number') {
        return res.status(400).json({message: "Size is required or is not a number"});
    }
    try {
        const user = await User.findOne({login: req.user});
        console.log(user)
        const record = user.bodyParameters[param].find(obj => {
            return obj._id.equals(id);
        });
        if (!record) {
            return res.sendStatus(204); //no content
        }
        record.size = size;
        const lastResult = user.bodyParameters[param][user.bodyParameters[param].length - 1];
        const measurementGoal = user.goals.find(obj => (obj.bodyParameter === String(param) && !obj.finished));
        if (measurementGoal && lastResult._id.equals(id) && record.size >= measurementGoal.currentValue) {
            measurementGoal.currentValue = lastResult.size;
        }
        await user.save();
        res.json({record});
    } catch (e) {
        res.status(500).json({message: e.message});
    }

}
const deleteMeasurement = async (req, res) => {
    const {param} = req.params;
    let {id} = req.body;

    try {
        const user = await User.findOne({login: req.user});
        let record = user.bodyParameters[param].find(obj => {
            return obj._id.equals(id);
        });
        if (!record) {
            return res.sendStatus(204); //no content
        }
        const measurementGoal = user.goals.find(obj => (obj.bodyParameter === String(param) && !obj.finished));
        if (measurementGoal && record.size === measurementGoal.currentValue) {
            //set currentValue as last result
            const lastResult = user.bodyParameters[param][user.bodyParameters[param].length - 1];
            measurementGoal.currentValue = lastResult.size;

        }
        user.bodyParameters[param] = user.bodyParameters[param].filter(obj => !obj.equals(record));
        const result = await user.save();
        res.json({message: "Entry has been deleted!"});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


module.exports = {
    getLatestAll,
    addMeasurement: [paramExists, addMeasurement],
    getMeasurement: [paramExists, getMeasurement],
    changeMeasurement: [paramExists,verifyId, changeMeasurement],
    deleteMeasurement: [paramExists, verifyId, deleteMeasurement],
};