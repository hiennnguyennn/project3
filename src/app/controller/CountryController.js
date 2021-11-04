const Country = require('../models/Country');
const { multipleMongooseToObject } = require('../../util/mongoose');
const ava = require('../middleware/checkAuth');
class CountryController {
    create(req, res, next) {
        res.render('country/createCountry', { avatar:ava(req, res, next).avatar,login:ava(req,res,next).login });
    };
    store(req, res) {
        Country.findOne({ name: req.body.name })
            .then(c => {
                if (c == null) {
                    // res.json(req.files);
                    var image = [];
                    req.files.forEach(function (value, index) {
                        image.push('/' + value.path.split('\\').splice(-4).join('/'));
                    })
                    req.body.img = image;
                    const c = new Country(req.body);
                    c.save().then(() => {
                        res.render('country/showCountry', { c, avatar:ava(req, res, next).avatar,login:ava(req,res,next).login  });
                    })
                }
                else {
                    var x = req.body;
                    res.render('country/createCountry', {
                        err: 'This country name already exist! Please create new country or update!',
                        c: x,
                        avatar:ava(req, res, next).avatar,login:ava(req,res,next).login 
                    });
                }
            })

    };
    show(req, res, next) {
        Country.findOne({ slug: req.params.slug })
            .then((c) => {
                c = c.toObject();
                res.render('country/showCountry', {avatar:ava(req, res, next).avatar,login:ava(req,res,next).login , c });
            })
            .catch(next);
    };
    showList(req, res, next) {
        Country.find({}).then(countries => {
            res.render('country/listCountry', {
                cs: multipleMongooseToObject(countries), avatar:ava(req, res, next).avatar,login:ava(req,res,next).login 
            })
        })

    }
};
module.exports = new CountryController();
