const jwt = require("jsonwebtoken");
const secret = "CoCo";

function setuser(user) {
    const payload = {
        email: user.email,
        name: user.name
    }
    return jwt.sign(payload, secret);
}

function getuser(token) {
    if (!token) return null;
    return jwt.verify(token, secret);
}

module.exports = { setuser, getuser }