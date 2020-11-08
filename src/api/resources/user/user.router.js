const express = require('express');
const router = express.Router();

const passport=require('passport');

const userController = require('./user.controller');

//[POST] api/users/sign-up
router.post('/sign-up', userController.createUser);

//[POST] api/users/sign-in
router.post('/sign-in', userController.signInUser);

//[GET] api/users/me
router.get('/me',passport.authenticate('jwt',{session:false}),userController.authencate);

module.exports = router;