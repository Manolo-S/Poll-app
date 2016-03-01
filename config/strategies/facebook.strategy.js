var passport = require('passport');
var FacebookStrategy = require('passport-facebook').FacebookStrategy;

module.exports = function(){
	passport.use(new FacebookStrategy({
		clientID:'',
		clientSecret: '',
		callbackURL: '',
		passReqToCallback: true
	},
	function (req, accessToken, refreshToken, profile, done){
			var user = {};
        
            user.email = profile.emails[0].value;
            user.displayName = profile.displayName;
        
            user.facebook = {};
            user.facebook.id = profile.id;
            user.facebook.token = accessToken;
            
            done(null, user);
	}))
}