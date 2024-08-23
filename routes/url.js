const Router = require('express').Router();
const { handlerGenerateNewShortUrl, handlerAnalyse, handlerDelete } = require('../controllers/urlHandler');

Router.route('/').post(handlerGenerateNewShortUrl);
Router.route('/analyse/:shortId').get(handlerAnalyse);
Router.route('/delete/:shortId').get(handlerDelete);

module.exports = Router;