const express = require('express');
const router = express.Router();
const path = require('path');
const MeController=require('../app/controller/MeController');

router.post('/book',MeController.book);
router.get('/profile',MeController.info);
router.get('/logout',MeController.logout);

module.exports = router;