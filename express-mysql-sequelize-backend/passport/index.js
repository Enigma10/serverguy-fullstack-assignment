const passport = require('passport')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const Joi = require('joi')
const { User } = require('../models')
const {
	GOOGLE_CREDENTAILS,
	FACEBOOK_CREDENTAILS
} = require('../constants')

passport.serializeUser(function(user, done) {
	console.log('serializeUser');
	done(null, user);
});
 
passport.deserializeUser(function(user, done) {
	console.log('deserializeUser');
	done(null, user);
});
passport.use(new LocalStrategy(async (username, password, done) => {
	try {
		if (!username || !password) {
			return done(new Error())
		}
		if (username.trim().length < 1 || password.trim().length < 1) {
			return done(new Error())
		}
		const result = Joi.validate({ email: username }, {
			email: Joi.string().email(),
		})
		const emailOrUsername = {}
		if (result.error) {
			emailOrUsername.username = username
		} else {
			emailOrUsername.email = username
		}
		// vikas1h		// console.log('emailOrUsername', )
		if(Object.keys(emailOrUsername)[0] === 'username') {
			const user = await User.findOne({
				where: {
					username: emailOrUsername.username
				}
			})
		} else {
			const user = await User.findOne({
				where: {
					email: emailOrUsername.email
				}
			})
		}

		const user = await User.findOne(emailOrUsername)
		
		if (!user) {
			return done(new Error())
		}
		// const salt = user.get('salt')
		// if (user.get('password_hash') === computePasswordHash(password, salt).passwordHash) {
		// }
		return done(null, user)
		// return done(new Error())
	} catch (error) {
		return done(error)
	}
}))

passport.use(new FacebookStrategy(FACEBOOK_CREDENTAILS,
	async (req, accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({
      where: {
				facebookID: profile.id
			}
		});
    if (existingUser) {
        done(null, existingUser);
    } else {
				const email = profile.emails[0].value
				let user
				user = await User.findOne({
					where: {
						email
					}
				})
				if (!user) {
					user = await User.create({
						username: profile.name.givenName + profile.name.familyName,
						facebookID: profile.id,
						email: email
					})
				} else {
					user = await user.update({
						facebookID: profile.id,
					},
					{
						returning: true,
					})
				}
      done(null, user);
    }
  }
));

passport.use(new GoogleStrategy(GOOGLE_CREDENTAILS,
  async (req, accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({
      where: {
				googleID: profile.id
			}
		});
    if (existingUser) {
        done(null, existingUser);
    } else {
				const email = profile.emails[0].value
				let user
				user = await User.findOne({
					where: {
						email
					}
				})
				if (!user) {
					user = await User.create({
						username: profile.displayName,
						googleID: profile.id,
						email: email
					})
				} else {
					user = await user.update({
						googleID: profile.id,
					},
					{
						returning: true,
					})
					console.log('user after update', user)
				}
      done(null, user);
    }
  }
));