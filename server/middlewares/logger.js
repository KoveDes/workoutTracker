exports.logger = (req, res, next) => {
    console.info(`Method: ${req.method} "${req.path}" (${new Date().toLocaleString()})`);
    next();
}