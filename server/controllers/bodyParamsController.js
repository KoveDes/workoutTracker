const User = require('../models/User');
const {bodyParamsSchema} = require("../models/BodyParams");
const {get} = require("mongoose");


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
    const latestSizes = await User.aggregate(pipeline).exec();
    res.json(latestSizes[0]);

}


const paramExists = (req,res,next) => {
    const params = Object.keys(bodyParamsSchema.obj);
    if (params.includes(req.params.param)) {
        next()
    } else {
        res.status(400).json({
            message: "Invalid body parameter"
        })
    }

}


const addMeasurement = async (req, res) => {
    const {param, size} = req.params;
    console.log(param, size)
    //validate param
    //1) is param provided
    //2) is param in keys
}



const getMeasurement = async (req,res) => {
    const {param} = req.params;
    try {}
    catch(e) {
        res.status(500).json({message: e.message});
    }
}
const changeMeasurement = async (req,res) => {}
const deleteMeasurement = async (req,res) => {}

    // try {
    //     const foundUser = await User.findOne({login: req.user}).exec();
    //     console.log(foundUser);
    //     foundUser.bodyParameters.hips = [...foundUser.bodyParameters.hips, {size: 999}];
    //     const result = await foundUser.save();
    // } catch (e) {
    //     console.log(e.message)
    // }



module.exports = {getLatestAll, addMeasurement, getMeasurement: [paramExists, getMeasurement], changeMeasurement, deleteMeasurement};