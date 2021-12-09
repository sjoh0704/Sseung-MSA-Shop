module.exports = (req, res, next) => {
    next();
    for (let key of Object.keys(req.headers)) {
        if (key.startsWith("x-")) {
            res.header[key] = req.headers[key];
        }
    }
};
