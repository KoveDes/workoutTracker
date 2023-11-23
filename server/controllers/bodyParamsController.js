const User = require('../models/User');
const {bodyParamsSchema} = require("../models/BodyParams");
const verifyId = require("../middlewares/verifyID");
const pagination = require("../utils/transformToPagination");

const dateYearFormatter = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
    });


const getLatestAll = async (req, res) => {
    //lista parametrów
    const params = Object.keys(bodyParamsSchema.obj);
    const pipeline = [
        {$match: {login: req.query.user}}
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
        const sort = {
            $sort: {[`bodyParameters.${param}.date`]: -1}
        };

        pipeline.push(unwind, sort);
    });
    pipeline.push({$project: {_id: 0, bodyParameters: 1}});
    try {
        const latestSizes = await User.aggregate(pipeline).limit(1).exec();
        res.json(latestSizes);
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
    const {param, limit, skip} = req.params;
    try {
        const user = await User.findOne({login: req.query.user},
            {[`bodyParameters.${param}`]: 1,}
        );

        res.json({
            data: pagination(user.bodyParameters[param].reverse()),
            count: user.bodyParameters[param]?.length
        });
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
        console.log(user.bodyParameters[param]);
        //if user edited only the last

        //delete entries from the same day
        const currentDay = dateYearFormatter(new Date());
        const differentDayEntries = user.bodyParameters[param].filter(entry => {
            return !(currentDay === dateYearFormatter(entry.date));

        })
        user.bodyParameters[param] = [...differentDayEntries, {size}];


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
        let goalMessage;
        const lastResult = user.bodyParameters[param][user.bodyParameters[param].length - 1];
        const measurementGoal = user.goals.find(obj => (obj.bodyParameter === String(param) && !obj.finished));
        if (measurementGoal && lastResult._id.equals(id) && record.size >= measurementGoal.currentValue) {
            measurementGoal.currentValue = lastResult.size;
            measurementGoal.finished = true;
            goalMessage = {
                message: "Goal has been achieved!",
                goal: measurementGoal
            }
        }
        await user.save();
        res.json({record, goalMessage});
    } catch (e) {
        res.status(500).json({message: e.message});
    }

}
const deleteMeasurement = async (req, res) => {
    const {param} = req.params;
    let {id} = req.query;

    try {
        const user = await User.findOne({login: req.user});
        let record = user.bodyParameters[param].find(obj => {
            return obj._id.equals(id);
        });
        if (!record) {
            return res.sendStatus(204); //no content
        }
        let goalMessage;
        const measurementGoal = user.goals.find(obj => (obj.bodyParameter === String(param) && !obj.finished));
        if (measurementGoal && record.size === measurementGoal.currentValue) {
            //set currentValue as last result
            const lastResult = user.bodyParameters[param][user.bodyParameters[param].length - 1];
            measurementGoal.currentValue = lastResult.size;
            if(measurementGoal.currentValue > measurementGoal.endValue) {
                measurementGoal.finished = true;
                goalMessage = {
                    message: "Goal has been achieved!",
                    goal: measurementGoal
                }
            }

        }
        user.bodyParameters[param] = user.bodyParameters[param].filter(obj => !obj.equals(record));
        const result = await user.save();
        res.json({message: "Entry has been deleted!", goalMessage});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


module.exports = {
    getLatestAll,
    addMeasurement: [paramExists, addMeasurement],
    getMeasurement: [paramExists, getMeasurement],
    changeMeasurement: [paramExists,verifyId, changeMeasurement],
    deleteMeasurement: [paramExists, deleteMeasurement],
};