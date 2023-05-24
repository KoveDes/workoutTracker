exports.logger = (req, res, next) => {
    console.info(`Method: ${req.method} at "${req.path}" (${new Date().toLocaleString()})`);
    next();
}