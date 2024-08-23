const { User } = require("../models/user");
const { setuser } = require("../services/auth");

async function handlerUserSignup(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.json({ err: "all fields are required!!" });
    }
    if (await User.findOne({ email: email })) {
        return res.render('signup', { err: "user already exist!" });
    }
    const CrrUser = await User.create({
        name,
        email,
        password
    });
    return res.redirect('/login');
}

async function handlerUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render('login', {
            err: "Invalid User ID or Password!"
        });
    }
    const token = setuser(user);
    res.cookie("token", token);
    return res.redirect('/');
}

module.exports = { handlerUserSignup, handlerUserLogin };