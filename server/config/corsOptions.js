const whiteLists = [
    'http://localhost:3000',
    // 'http://localhost:3001',
    // 'http://localhost:127.0.0.1:5500',
    // 'http://localhost:3500',
    // 'http://localhost:5173',
    // 'http://127.0.0.1:5173',
    // 'http://127.0.0.1:5174',
    // 'http://127.0.0.1:5175',
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