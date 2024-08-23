const mongoose = require('mongoose');

function connectMongo(url) {
    mongoose.connect(url);
    console.log("Connected to the database!");
}

module.exports = { connectMongo };