const {Schema} = require('mongoose');

exports.bodyParamsSchema = new Schema({
    leftCalf: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    rightCalf: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    leftThigh: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    rightThigh: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    hips: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    waist: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    chest: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    neck: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    shoulders: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    leftForearm: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    rightForearm: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    leftArm: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
    rightArm: [
        {
            date: {
                type: Date,
                immutable: true,
                default: function () {
                    return Date.now()
                }
            },
            size: Number,
        }
    ],
});
