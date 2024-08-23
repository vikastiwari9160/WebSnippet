const Router = require('express').Router();
const { handlerUserSignup, handlerUserLogin } = require('../controllers/user');

Router.post('/signup', handlerUserSignup);
Router.post('/login', handlerUserLogin);

module.exports = Router;