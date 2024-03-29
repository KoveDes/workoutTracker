const whiteLists = [
    'http://localhost:3000',
    'https://gymtrackr.onrender.com',
    '44.226.145.213',
    '54.187.200.255',
    '34.213.214.55',
    '35.164.95.156',
    '44.230.95.183',
    '44.229.200.200',
    'http://127.0.0.1:5173',

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