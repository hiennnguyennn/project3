var Person = require('../models/Person');
const jwt = require('jsonwebtoken');

module.exports.requireAuth = function (req, res, next) {
    const token = req.cookies.token;
    const t = req.params.slug;
    if (!token) {
        res.redirect('back');
        return;
    };
    jwt.verify(req.cookies.token, process.env.ACCESSTOKENSECRET, function (err, decoded) {
        if (decoded == undefined) {
            res.redirect('back');           
            return;
        }
    });
    next();
}