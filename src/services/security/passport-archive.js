// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GoogleTokenStrategy = require('passport-google-token').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const passport = require('passport');
// require('../../../dotenv-config');

// const keys = require('../../config/keys');

// const getProfile = profile => {
//   const { id, displayName, emails, provider } = profile;
//   if (emails?.length) {
//     const email = emails[0].value;
//     return {
//       googleId: id,
//       name: displayName,
//       email,
//       provider,
//     };
//   }
//   return null;
// };

// /* =================== Handeling Infinite run: Start ===================  */

// // For Google
// passport.use(
//   new GoogleTokenStrategy(
//     {
//       clientID: keys.GOOGLE_CLIENT_ID,
//       clientSecret: keys.GOOGLE_CLIENT_SECRET,
//       // callbackURL: '/auth/google/callback',
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       console.log('google token strategy', profile);
//       // profile has all google login data
//       /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */

//       try {
//         // check if google id already inserted
//         const existingGoogleAccount = await UserService.findOne({ googleId: profile.id});
//         if (!existingGoogleAccount) {
//           const existingEmailAccount = await UserService.findOne({
//             email: getProfile(profile).email,
//           });
//           if (!existingEmailAccount) {
//             const createdUser = await new UserService.create(profile);

//             return done(null, createdUser);
//           }

//           return done(null, existingEmailAccount);
//         }

//         return done(null, existingGoogleAccount);
//       } catch (error) {
//         throw new Error(error)
//       }
//     }
//   )
// );

// // For facebook
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: keys.FACEBOOK_APP_ID,
//       clientSecret: keys.FACEBOOK_APP_SECRET,
//       callbackURL: '/auth/facebook/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: START =========  */
//       // check if user id already inserted
//       User.findOne({ userId: profile.id }).then(existingUser => {
//         if (existingUser) {
//           done(null, existingUser);
//         } else {
//           // new user case
//           // insert new user id
//           new User({
//             userId: profile.id,
//             username: profile.displayName,
//             picture: profile._json.picture,
//           })
//             .save()
//             .then(user => {
//               done(null, user);
//             });
//         }
//       });
//       /* ========= DATABASE CHECK PRE EXIST AND INSERT QUERY: END =========  */
//     }
//   )
// );
