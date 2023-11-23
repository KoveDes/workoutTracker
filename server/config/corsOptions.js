const whiteLists = [
    'http://localhost:3000',
    'https://gymtrackr.onrender.com/',

];
const corsOptions = {
    origin: (origin, callback) => {
        (whiteLists.includes(origin) || !origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200,
};
module.exports = {
    corsOptions,
    whiteLists,
}