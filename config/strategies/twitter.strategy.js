var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(){
	passport.use(new TwitterStrategy({
		consumerKey: '4pozJb8uU1m01B5wTQFOX96Db',
		consumerSecret: 'rhePixEGTuDgGc6echiOg7S5vWmt52Vt8mJQ3a41kociIE789H',
		callbackURL: 'https://poll-app-ms.herokuapp.com/auth/twitter/callback',
		passReqToCallback: true
	},
	function(req, token, tokenSecret, profile, done){
			var user = {};
        
            user.displayName = profile._json.name;
        
            user.twitter = {};
            user.twitter.id = profile.id;
            user.twitter.token = token;
            
            done(null, user);
	}))
};




