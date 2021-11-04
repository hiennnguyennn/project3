const Tour = require('../models/Tour');
const Person = require('../models/Person');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/Ticket');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    book(req, res, next) {
        var userId;
        //  var tourId=req.body.tour_id;
        jwt.verify(req.cookies.token, process.env.ACCESSTOKENSECRET, function (err, decoded) {
            userId = decoded.user_id;
        });
        //req.body.tour_id=tourId;
        req.body.user_id = userId;
        const t = new Ticket(req.body);
        t.save().then(() => {
            var x;
            Person.findOne({ _id: userId }).then((p) => {
                p.order.push(t._id);
                Person.updateOne({ _id: userId }, p).then(() => {

                })
            });
            Tour.findOne({ _id: req.body.tour_id }).then((tour) => {
                tour.sold = parseInt(tour.sold) + parseInt(req.body.count);
                tour.order.push(t._id);
                Tour.updateOne({ _id: req.body.tour_id }, tour)
                    .then((m) => {
                        res.redirect('/')
                    })
            });

            //res.redirect('/');
        })
    };
    info(req, res, next) {
        res.render('me/profile')
    };
    logout(req, res, next) {
        res.clearCookie("token");
        res.redirect("/");
    }
}
module.exports = new MeController();