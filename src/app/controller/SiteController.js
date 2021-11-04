const Person = require('../models/Person');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ava = require('../middleware/checkAuth');
// const a=req


class SiteController {
    home(req, res, next) {
        // const token = req.cookies.token;
        // var avatar='https://avatar-redirect.appspot.com/google/106985616779575625930?size=400';
        // if(token){
        //     jwt.verify(req.cookies.token, process.env.ACCESSTOKENSECRET, function (err, decoded) {
        //         if (decoded != undefined) {
        //             var user_id=decoded.user_id;
        //             Person.findOne({_id:user_id}).then((p)=>{
        //                 if(p.avatar!=null){
        //                     avatar=p.avatar;
        //                 }
        //             })
        //         }
        //     });
        // }
        //  res.json(avatar);
        res.render('home', { avatar: ava(req, res, next).avatar,login:ava(req,res,next).login });
    };
    register(req, res, next) {
        res.render('register')
    };
    login(req, res, next) {
        res.render('login')
    }
    store(req, res, next) {

        var pass = req.body.pass;

        Person.findOne({ email: req.body.email })
            .then(p => {
                if (p == null) {

                    // res.json(process.env.SALTROUNDUSER);
                    bcrypt.genSalt(10, function (err, salt) {
                        if (err) return next(err);
                        bcrypt.hash(pass, salt, function (err, hash) {
                            if (req.file != null) req.body.avatar = (req.file.path.split('\\').splice(-4).join('/'));
                            const p = new Person(req.body);
                            p.pass = hash;
                            p.save().then(() => {
                                const token = jwt.sign({
                                    user_id: p._id,
                                    name: p.name,
                                    part: p.part
                                }, process.env.ACCESSTOKENSECRET, {
                                    expiresIn: "2h",
                                });
                                res.cookie('token', token);
                                res.redirect('/');
                            })
                        })
                    })

                    // else if (req.body.part == "admin") {
                    //     bcrypt.hash(pass, parseInt(process.env.SALTROUNDADMIN), function (err, hash) {
                    //         req.body.avatar = (req.file.path.split('\\').splice(-4).join('/'));
                    //         const p = new Person(req.body);
                    //         p.save().then(() => {
                    //             const token = jwt.sign({
                    //                 _id: p._id,
                    //                 name: p.name,
                    //                 part: p.part
                    //             }, process.env.ACCESS_TOKEN_SERECT, {
                    //                 expiresIn: "2h",
                    //             });
                    //             res.cookie('token', token);
                    //             res.redirect('/');
                    //         })
                    //     })
                    // }

                }
                else {
                    var p = req.body;
                    res.render('register', {
                        err: 'This email already used',
                        p
                    })
                }
            })
    };
    handleLogin(req, res, next) {
        var email = req.body.email;
        var pass = req.body.pass;
        Person.findOne({ email: email })
            .then(per => {
                if (per == null) {
                    res.render('login', {
                        errs:'User does not exist',
                        p: req.body
                    });
                    return;
                };
                bcrypt.compare(pass, per.pass, function (err, result) {
                    if (result == false) {
                        res.render('login', {
                            err: 'Wrong password',
                            p: req.body
                        });
                        return;
                    };
                    const token = jwt.sign({
                        user_id: per._id,
                        name: per.name,
                        part: per.part
                    }, process.env.ACCESSTOKENSECRET, {
                        expiresIn: "2h",
                    });
                    res.cookie('token', token);
                    res.redirect('/');
                });

            })
            .catch(next)
    }
}
module.exports = new SiteController();