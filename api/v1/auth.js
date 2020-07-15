const express = require('express');
const router = express.Router();

const passport = require('../../config/passport');

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('success');
    // res.redirect('/');
	}
);

// Returns user if authenticated/found
router.post('/', passport.authenticate('jwt', { session: false }),
  function(req, res) {
  	res.json(req.user);
  }
);

module.exports = router;