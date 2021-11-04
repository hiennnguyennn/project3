const express = require('express');
const router = express.Router();
const path = require('path');
const CountryController=require('../app/controller/CountryController');
const multer  = require('multer');
const upload = multer({ dest: path.resolve(__dirname,'../public/image/db/country') });


router.get('/create',CountryController.create);
router.post('/create',upload.array("img",8),CountryController.store);
router.get('/:slug',CountryController.show);
router.get('/',CountryController.showList);

module.exports = router;