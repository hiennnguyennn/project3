const Tour = require('../models/Tour');
const Country = require('../models/Country');
const Category=require('../models/CategoryTour');
const { multipleMongooseToObject } = require('../../util/mongoose');
const ava = require('../middleware/checkAuth');
const sort = require('../middleware/sort');
class TourController {
    create(req, res, next) {
        res.render('tour/createTour', { avatar:ava(req, res, next).avatar,login:ava(req,res,next).login });
    };
    store(req, res, next) {
        var plan = [];
        var image = [];
        req.files.forEach(function (value, index) {
            image.push('/' + value.path.split('\\').splice(-4).join('/'));
        })
        req.body.img = image;
        for (var i = 0; i < req.body.plan_titles.length; i++) {
            console.log(i);
            plan[i] = {
                plan_title: req.body.plan_titles[i],
                plan_include: req.body.plan_includes[i].split(","),
                plan_notInclude: req.body.plan_notIncludes[i].split(","),
                plan_description: req.body.plan_descriptions[i],
            };
        };
        req.body.plan = plan;
        req.body.category = req.body.category.toString().split(",");
        req.body.included = req.body.included.split(",");
        req.body.notInclude = req.body.notInclude.split(",");
        const t = new Tour(req.body);
        t.save().then(() => {
            res.redirect('/');
        })
    };
    show(req, res, next) {
        Tour.findOne({ slug: req.params.slug })
            .then((t) => {
                t = t.toObject();
                Country.findOne({ slug: t.destination.toLowerCase() })
                    .then((c) => {
                        c = c.toObject();
                        //res.json(c);
                        res.render('tour/showTour', { t, c, avatar:ava(req, res, next).avatar,login:ava(req,res,next).login })
                    });

            })
            .catch(next)

    };
    showList(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var s = req.query.sortTour || 'date';
        var name, des, month, category;
        name = req.query.tour_name || "";
        des = req.query.destination || "";
        month = req.query.month || "";
        category = req.query.category || "";
        var perPage = 3;
        var begin = (page - 1) * perPage;
        var end = page * perPage;
        Tour.find({}).then(tours => {
            
            var t;
            var t = [];

            for (var i = 0; i < tours.length; i++) {
                if (tours[i].name.toLowerCase().indexOf(name) != -1) {
                    if (tours[i].destination.toLowerCase().indexOf(des) != -1) {
                        if((category!=""&&tours[i].category.includes(category))||category==""){
                                var d= new Date(tours[i].start);
                                if((month!=""&&(d.getMonth()+1)==month)||month==""){
                                    t.push(tours[i]);
                                }
                                
                        } 
                        // if (tours[i].category.includes(category)) {
                        //     t.push(tours[i]);
                        // }

                    }

                };
            }
            const maxPage = Math.ceil(t.length / perPage);
            if (s == 'date') {
                t = sort.date(t);
            }
            else if (s == 'pricelth') {
                t = sort.pricelowtohigh(t);
            }
            else if (s == 'pricehtl') {
                t = sort.pricehightolow(t);
            }
            else if (s == 'nameasc') {
                t = sort.nameasc(t);
            }
            else if (s == 'namedsc') {
                t = sort.namedsc(t);
            }

            res.render('tour/listTour', {
                s,
                page,
                maxPage,
                name,
                des,
                month,
                category,
                tours: multipleMongooseToObject(t.slice(begin, end)),
                avatar:ava(req, res, next).avatar,login:ava(req,res,next).login 
            })
        })

    }
}
module.exports = new TourController();