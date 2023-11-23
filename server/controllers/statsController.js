const User = require("../models/User");
const Workout = require("../models/Workout");
const getRecords = async (req, res) => {
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});

        const stats = await Workout.aggregate([
            {$match: {user: userId}},
            {$unwind: "$exercises"},
            {$unwind: "$exercises.sets"},
            {
                $group: {
                    _id: "$exercises.name",
                    maxLoad: {$max: "$exercises.sets.load"}
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    maxLoad: 1
                }
            }
        ]);
        res.json(stats);

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const getStats = async (req, res) => {
    try {
        const {_id: userId} = await User.findOne({login: req.user}, {_id: 1});
        const stats = await Workout.aggregate([
            {
                $match: {
                    user: userId
                }
            },
            {
                $project: {
                    setsInWorkout: {
                        $sum: {
                            $map: {
                                input: "$exercises",
                                as: "obj",
                                in: {
                                    $size: "$$obj.sets"
                                }
                            }
                        }
                    },
                    repsInWorkout: {
                        $sum: {
                            $map: {
                                input: "$exercises",
                                as: "exercise",
                                in: {
                                    $sum: {
                                        $map: {
                                            input: "$$exercise.sets",
                                            as: "set",
                                            in: "$$set.reps"

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                $group: {
                    _id: null, //dowolna wartość, bo chcemy uzyskać jedną grupę
                    setsCount: {$sum: "$setsInWorkout"}, //łączna lista setów
                    repsCount: {$sum: "$repsInWorkout"},
                    // totalTime: {$sum: "$totalTime"},
                    totalWorkouts: {$count: {}}

                }
            },
            {
                $project: {
                    _id: 0
                }
            }

        ]);
        res.json({
            workoutsCount: stats[0].totalWorkouts,
            setsCount: stats[0].setsCount,
            repsCount: stats[0].repsCount,
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }

}

module.exports = {getStats, getRecords};