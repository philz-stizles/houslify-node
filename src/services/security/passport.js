const passport = require('passport');
const UserService = require('../app/user.services');

passport.serializeUser((user, done) => {
  console.log('serialize user', user);
  done(null, user.id);
});

passport.deserializeUser(async (email, done) => {
  try {
    console.log('deserialize user', email);
    const user = await UserService.findOne({ email });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use('google-signup', GoogleRegister);
passport.use('google-signin', GoogleLogin);

module.exports = passport;