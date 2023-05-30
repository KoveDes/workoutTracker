const User = require("../models/User");
const Workout = require("../models/Workout");
const getRecords = async (req, res) => {
}

const getStats = async (req, res) => {
    try {
        // const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        // const workoutsCount = await Workout.countDocuments({user: userId})
        res.json({
            muscleUsage,
            workoutsCount,
            setsCount,
            repsCount,
            totalWorkoutTime,
            avgWorkoutTime,
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }

}
const getMuscleUsage = async (req, res) => {
}
const getWorkoutsCount = async (req, res) => {
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const workoutsCount = await Workout.countDocuments({user: userId})
        res.json({count: workoutsCount});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
const getSetsCount = async (req, res) => {
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        // const workouts = await Workout.find({user: userId}, {user: 0});
        // const setsCount = workouts.reduce((total, workout) => {
        //     return total + workout.exercises.reduce((setsTotal, exercise) => {
        //         return setsTotal + exercise.sets.length
        //     }, 0)
        // }, 0);
        // res.json({count: setsCount});

        const setsCount = await Workout.aggregate([
            {
                //znajdź dokumenty zalogowanego użytkownika
                $match: {
                    user: userId
                }
            },
            {
                //zwraca tylko określone pole => stworzone setsInWorkout
                $project: {
                    //zawiera sumę setów pojedynczego dokumentu
                    setsInWorkout: {
                        $sum: {
                            //zwraca listę obiektów zawierających liczbę setów ćwiczenia
                            $map: {
                                input: "$exercises",
                                as: "obj",
                                in: {
                                    $size: "$$obj.sets"
                                }
                            }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: "ada", //dowolna wartość, bo chcemy uzyskać jedną grupę
                    total: {$sum: "$setsInWorkout"} //łączna lista setów
                }
            }

        ]);
        res.json({count: setsCount[0].total});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
const getRepsCount = async (req, res) => {
}
const getWorkoutTime = async (req, res) => {
}


module.exports = {getStats,getRecords, getMuscleUsage, getWorkoutsCount, getSetsCount, getRepsCount, getWorkoutTime};