const knex = require('../db/knex');

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GitHubStrategy = require('passport-github').Strategy;


const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET
}

// Verifies jwt using JWT_SECRET and then fetches the appropriate user if found
passport.use(
	new JwtStrategy(
		options,
		function(jwt_payload, done) {
			const query = knex
				.select('*')
				.from('users')
				.where('id', jwt_payload.id)
				.limit(1)
				.first();

			query
				.then((user) => {
					if (user) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				});
		}
	)
);

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
  	const findQuery = knex
  		.select('*')
  		.from('users')
  		.where('github_id', profile.id)
  		.limit(1)
  		.first();

  	findQuery
  		.then((user) => {
  			if (user) {
  				return cb(err, user)
  			} else {
  				console.log(profile)
  				
  				const insertQuery = knex
  					.returning('*')
  					.insert({ github_id: profile.id })
  					.into('users');

  				insertQuery
  					.then((user) => {
  						return cb(err, user[0])
  					})
  			}
  		})
  }
));

module.exports = passport;
