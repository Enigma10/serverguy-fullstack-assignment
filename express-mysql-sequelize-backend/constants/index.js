const WRONG_CREDENTIALS = {
	code: 401,
	message: 'Incorrect credentials'
}

const LOGIN_SUCCESS = {
  code: 200,
  message: 'Logged In Successfully',
}
const LOGOUT_SUCCESS = {
  code: 200,
  message: 'Logged Out Successfully',
}

const GOOGLE_CREDENTAILS = {
  clientID: '214309679510-m9nfg2njl4ogoo9s8hluocufll9s5gv9.apps.googleusercontent.com',
  clientSecret: '3tVHVS4B7Suqt5qNDRdUVI-Y',
  callbackURL: "http://localhost:3000/auth/google/callback",
  passReqToCallback: true
}
const FACEBOOK_CREDENTAILS = {

	// callbackURL:'auth/fredirect',
	// clientID: "542899819495663",
  // clientSecret: "2951dbc2d13c4e0e2ac6e34b8c487e05",
  clientID: '255793168392684',
  clientSecret: 'a4fee0cc2aeb12b1cd6263bb85a9ca35',
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name'],
  passReqToCallback: true
}


module.exports = {
	WRONG_CREDENTIALS,
	LOGIN_SUCCESS,
	LOGOUT_SUCCESS,
  GOOGLE_CREDENTAILS,
  FACEBOOK_CREDENTAILS
}