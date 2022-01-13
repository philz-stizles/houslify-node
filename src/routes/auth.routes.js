const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
  signup,
  googleLogin,
  login,
  loginWith2FA,
  turnOnTwoFactorAuth,
  generateTwoFactorAuthCode,
  secondFactorAuthentication,
  forgotPassword,
  resetPassword,
  logoutCookie,
} = require('../controllers/auth.controllers');
const {
  loginValidator,
  signupValidator,
} = require('../middlewares/validationMiddlewares');
const {
  authenticate,
  isAuthenticatedWith2FA,
} = require('../middlewares/auth.middlewares');

/* google routes ====================================================== */
router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  googleLogin
);

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google"),
//   (req, res) => {
//     res.redirect("/profile"); // login case - redirect to profile page
//   }
// );

/* facebook routes ==================================================== */
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function(req, res) {
    console.log("i am in fb callback");
    // Successful authentication, redirect home.
    res.redirect("/profile");
  }
);

// router.get('/api/current_user', (req, res) => {
//   res.send(req.user);
// });

// router.get('/api/logout', (req, res) => {
//   req.logout();
//   res.redirect('/'); // log out case
//   // res.send(req.user);
// });

router.post('/', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/login-with-2fa', loginValidator, loginWith2FA);
router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/login-with-2fa', loginValidator, loginWith2FA);
router.post(
  '/2fa/generate',
  isAuthenticatedWith2FA(),
  generateTwoFactorAuthCode
);
router.post('/2fa/turn-on', isAuthenticatedWith2FA(), turnOnTwoFactorAuth);

router.post(
  '/2fa/authenticate',
  isAuthenticatedWith2FA(true),
  secondFactorAuthentication
);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.get('/logout', logoutCookie);

module.exports = router;
