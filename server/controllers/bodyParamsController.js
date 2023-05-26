const User = require('../models/User');
const {bodyParamsSchema} = require("../models/BodyParams");


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



const getMeasurement = async (req,res) => {
    const {param} = req.params;
    try {
        const user = await User.findOne({login:req.user},
            {[`bodyParameters.${param}`]: 1, _id: 0,}
        );

        res.json(user.bodyParameters[param]);
    }
    catch(e) {
        res.status(500).json({message: e.message});
    }
}

const addMeasurement = async (req, res) => {
    const {param} = req.params;
    const {size} = req.body;
    if(!req?.body?.size || typeof req.body.size !== 'number') {
        return res.status(400).json({message: "Size is required or is not a number"});
    }
    try {
        const user = await User.findOne({login:req.user});
        user.bodyParameters[param] = [...user.bodyParameters[param], {size}];
        const result = await user.save();            //save in database
        res.json(result);
    }
    catch(e) {
        res.status(500).json({message: e.message});
    }
}

const changeMeasurement = async (req,res) => {
}
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