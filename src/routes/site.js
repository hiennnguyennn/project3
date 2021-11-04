const express = require('express');
const router = express.Router();
const path = require('path');
const siteController = require('../app/controller/SiteController')
const multer  = require('multer');
const upload = multer({ dest: path.resolve(__dirname,'../public/image/db/user/') });

router.get('/register',siteController.register);
router.get('/login',siteController.login);
router.post('/login',siteController.handleLogin)
router.post('/store',upload.single("avatar"),siteController.store)
router.get('/',siteController.home);

module.exports = router;