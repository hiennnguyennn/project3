const jwt = require('jsonwebtoken');
const Person = require('../models/Person');


var avatar = 'https://avatar-redirect.appspot.com/google/106985616779575625930?size=400';
var login=false;
function ava(req,res,next){
    const token = req.cookies.token;
    if (token) {
        jwt.verify(req.cookies.token, process.env.ACCESSTOKENSECRET, function (err, decoded) {
            if (decoded != undefined) {
                var user_id = decoded.user_id;
                Person.findOne({ _id: user_id }).then((p) => {
                    //res.json(p);
                    login=true;
                    if (p.avatar != null) {
                        avatar = p.avatar;
                    }
                })
            }
        });
    };
    return {avatar,login};
}

module.exports=ava;