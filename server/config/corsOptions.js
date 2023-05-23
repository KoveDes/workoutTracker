const whiteLists = [
    'http://localhost:3000',
    'http://localhost:127.0.0.1:5500',
];
exports.corsOptions = {
    origin: (origin, callback) => {
        (whiteLists.includes(origin) || !origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200
};