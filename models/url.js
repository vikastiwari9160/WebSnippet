const { mongoose } = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true
    },
    redirectURL: {
        type: String,
        require: true
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, { timestamp: true }
)

const Url = mongoose.model("urls", urlSchema);

module.exports = { Url };