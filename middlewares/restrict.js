const { getuser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return next();
    }
    const user = getuser(token);
    req.user = user;
    return next();
}

module.exports = { checkForAuthentication };