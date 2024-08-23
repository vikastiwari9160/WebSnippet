const ShortUniqueId = require('short-unique-id');
const { Url } = require('../models/url');

async function handlerGenerateNewShortUrl(req, res) {
    if (!req.user) res.redirect('/user/login');
    const body = req.body;
    if (!body.url) { return res.status(400).json({ Err: `URL is required!!` }); }
    const Urls = await Url.find({});
    const uid = new ShortUniqueId({ length: 6 });
    const Id = uid.rnd();
    const entry = await Url.create({
        shortId: Id,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })
    res.render("home", { ShortUrl: `http://localhost:8000/url/${Id}`, Urls })
}

async function handlerRedirect(req, res) {
    const Id = req.params.shortId;
    const entry = await Url.findOneAndUpdate({ shortId: Id }, { $push: { visitHistory: { timestamp: Date.now() } } });
    res.redirect(entry.redirectURL);
}

async function handlerAnalyse(req, res) {
    if (!req.user) res.redirect('/user/login');
    const Id = req.params.shortId;
    const entry = await Url.findOne({ shortId: Id, createdBy: req.user._id });
    res.json({
        TotalVisits: entry.visitHistory.length,
        Visits: entry.visitHistory
    })
}

async function handlerDelete(req, res) {
    const Id = req.params.shortId;
    await Url.findOneAndDelete({ shortId: Id });
    res.redirect('/');
}
module.exports = { handlerGenerateNewShortUrl, handlerRedirect, handlerAnalyse, handlerDelete };