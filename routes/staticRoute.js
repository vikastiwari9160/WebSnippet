const express = require('express');
const Router = express.Router();
const { Url } = require('../models/url');
const { handlerRedirect } = require("../controllers/urlHandler")

Router.route('/').get(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.redirect('/login');
    }
    const data = await Url.find({ createdBy: user._id });
    res.render("Home", { Urls: data });
});


Router.get('/signup', (req, res) => {
    res.render("signup");
})
Router.get('/login', (req, res) => {
    res.render("login");
})
Router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
})
Router.get('/url/:shortId', handlerRedirect);

module.exports = Router