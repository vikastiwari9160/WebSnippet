const express = require("express");
const ejs = require('ejs');
const path = require('path');
const cookieParser = require("cookie-parser");

const { connectMongo } = require('./connection');

const Url = require('./routes/url');
const User = require('./routes/user');
const StaticRouter = require("./routes/staticRoute");

const { checkForAuthentication } = require("./middlewares/restrict");

const app = express();

connectMongo('mongodb://127.0.0.1:27017/shortUrl');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', checkForAuthentication, Url);
app.use('/user', User);
app.use('/', checkForAuthentication, StaticRouter);

app.listen(8000, () => {
    console.log("Server Running!");
})