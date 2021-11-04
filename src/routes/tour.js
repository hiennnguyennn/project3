const express = require('express');
const router = express.Router();
const path = require('path');
const TourController=require('../app/controller/TourController');
const multer  = require('multer');
const upload = multer({ dest: path.resolve(__dirname,'../public/image/db/tour') });


router.get('/create',TourController.create);
router.post('/create',upload.array("img",10),TourController.store);
router.get('/:slug',TourController.show);
router.get('/',TourController.showList)

module.exports = router;