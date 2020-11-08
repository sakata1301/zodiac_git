const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkRoleAdmin=require('../../middleware/checkRoleAdmin');

const zodiacController = require('./zodiac.controller');



//[GET] api/zodiacs
router.get('/', zodiacController.getALLZodiac);

//[GET] api/zodiacs/:id
router.get('/:id', zodiacController.getZodiac);

//[POST] api/zodiacs
router.post('/', passport.authenticate('jwt', { session: false }), zodiacController.storedZodiac);

//[DELETE] api/zodiacs/:id
router.delete('/:id',passport.authenticate('jwt', { session: false }),checkRoleAdmin, zodiacController.deleteZodiac);

//[PUT] api/zodiacs/:id
router.put('/:id', passport.authenticate('jwt', { session: false }), zodiacController.updateZodiac);


module.exports = router;