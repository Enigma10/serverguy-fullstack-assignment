const passport = require('passport')
const express = require('express')
const router = express.Router()
const {
	WRONG_CREDENTIALS,
} = require('../constants')

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user) => {
		console.log(user)
		req.session.user = user
		/* Manualy wrote json because this error does not set the status code to 401,
				This may be due to passport */
		if (err) {
			return res.status(WRONG_CREDENTIALS.code).json({
				message: WRONG_CREDENTIALS.message,
			})
		}
		if (!user) {
			return res.status(WRONG_CREDENTIALS.code).json({
				message: WRONG_CREDENTIALS.message,
			})
		}
		return res.send({
      status: true,
      data: user,
    })
	})(req, res, next)
})

router.get('/google-login',
  passport.authenticate('google', { scope: ['profile', 'email'] }, (err, user) => {
		return res.send({
      status: true,
      data: user,
    })
	})
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
  function(req, res) {
    res.redirect('http://localhost:3001/projects');
  }  
);
	
router.get('/facebook-login',
  passport.authenticate('facebook', { scope: ['email'] }, (err, user) => {
		return res.send({
      status: true,
      data: user,
    })
	})
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000' }),
  function(req, res) {
    res.redirect('http://localhost:3001/projects');
  }  
)
// router.post('/logout', (req, res) => {
// 	req.logOut()
// 	req.session.destroy(() => {
// 		res.clearCookie('connect.sid', { path: '/' })
// 		res.clearCookie('jwt')
// 		return res.status(200).send({
// 			message: LOGOUT_SUCCESS.message,
// 			status: true,
// 		})
// 	})
// })
	
module.exports = router	