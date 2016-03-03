var express = require('express');
var passport = require('passport');
var router = express.Router();


router.route('/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/create-poll-new', //TODO revert to create-poll
        failure: '/error/'
    }));

router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

router.route('/twitter/callback')
    .get(passport.authenticate('twitter', {
        successRedirect: '/create-poll/',
        failure: '/error/'
    }));

router.route('/twitter')
    .get(passport.authenticate('twitter'))


router.route('/facebook')
    .get(passport.authenticate('facebook', {
        scope: ['email']
    }));

router.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
        successRedirect: '/create-poll',
        failureRedirect: '/error'
    }));
    
module.exports = router;