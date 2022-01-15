const { OAuth2Client } = require('google-auth-library');
const { sendPlainEmail } = require('../services/email/nodemailer');
const AppError = require('../errors/app.error');
const { generateToken } = require('../services/security/token.services');
const { catchAsync } = require('../utils/api.utils');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserService = require('../services/app/user.services');
const { createAndSendTokenWithCookie } = require('../utils/api.utils');
const {
  getTwoFactorAuthenticationCode,
  verifyTwoFactorAuthenticationCode,
  respondWithQRCode,
} = require('../services/security/auth.services');

// Signup ***************************************************************** |
exports.signup = catchAsync(async (req, res) => {
  const { username, fullname, email, password, confirmPassword } = req.body;

  const newUser = await new UserService.create({
    username,
    fullname,
    email,
    password,
    confirmPassword,
  });

  const token = UserService.generateToken();

  res.status(201).json({
    status: true,
    data: {
      loggedInUser: newUser,
      token,
    },
    message: 'created successfully',
  });
});

// Login ************************************************************** |
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const existingUser = await UserService.findOne({ email }); 
  if (!existingUser)
    return next(new AppError(400, 'Incorrect email or password'));

  // Check if password matches
  const isAuthenticated = await UserService.authenticate(password);
  if (!isAuthenticated)
    return next(new AppError(400, 'Incorrect email or password'));

  // respond with cookie token
  createAndSendTokenWithCookie(existingUser, 200, req, res, 'Login successful');
});

// Login with Google ************************************************************** |
exports.googleLogin = catchAsync(async (req, res, next) => {
  const { idToken } = req.body;

  console.log('GOOGLE LOGIN REQUEST BODY', req.body);
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); 
  const verificationResponse = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  console.log('GOOGLE LOGIN RESPONSE', verificationResponse)

  const { email_verified, name, email } = verificationResponse.payload;
  if (email_verified) {
    const existingUser = await UserService.findOne({ email });
    if (existingUser) {
      const { id, email, fullname, role } = existingUser;
      const token = generateToken({ id });
      return res.json({
        status: true,
        data: {
          token,
          user: { id, email, fullname, role },
        },
        message: ''
      });
    } else {
      let password = email + process.env.JWT_AUTH_SECRET;
      const createdUser = await new UserService().create({ firstName: name.split(' ')[0], lastName: name.split(' ')[1], email, hashedPassword: password });
      const { id, email: userEmail, fullname, role } = createdUser;
      const token = generateToken({ id });
        
      return res.json({
        status: true,
        data: {
          token,
          user: { id, email: userEmail, fullname, role },
        },
        message: '',
      });
    }
  } else {
    throw new Error(400, 'Google login failed. Try again');
  }
});

// Login with Facebook ************************************************************** |
exports.facebookLogin = catchAsync(async (req, res, next) => {
  console.log('FACEBOOK LOGIN REQ BODY', req.body);
  const { userID, accessToken } = req.body;

  const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;

  return (
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      // .then(response => console.log(response))
      .then(response => {
        const { email, name } = response;
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: '7d',
            });
            const { _id, email, name, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role },
            });
          } else {
            let password = email + process.env.JWT_SECRET;
            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log('ERROR FACEBOOK LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with facebook',
                });
              }
              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, name, role } = data;
              return res.json({
                token,
                user: { _id, email, name, role },
              });
            });
          }
        });
      })
      .catch(error => {
        res.json({
          error: 'Facebook login failed. Try later',
        });
      })
  );
});

// exports.loginWith2FA = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;

//   // Check if user exists
//   const existingUser = await User.findOne({ email }).select('+password'); // There is difference between adding
//   // +password and just password. +password will add to already visible fields if not already visible
//   // password without the + would select just that field as visible and will continue to include any new fields that
//   // you specify to the list of included fields. The _id is always returned accept you specify otherwise
//   // e.g .select('+password -_id')
//   if (!existingUser)
//     return next(new AppError(401, 'Incorrect email or password'));

//   // Check if password matches
//   const isMatch = await existingUser.comparePassword(password);
//   if (!isMatch) return next(new AppError(401, 'Incorrect email or password'));

//   // Generate token and set cookie.
//   existingUser.setCookieToken(req, res);

//   // If 2FA.
//   if (existingUser.isTwoFactorAuthenticationEnabled) {
//     res.json({
//       status: true,
//       data: {
//         isTwoFactorAuthenticationEnabled: true,
//       },
//       message: 'login with 2FA',
//     });
//   } else {
//     res.json({
//       status: true,
//       data: {
//         ...existingUser.toObject(),
//         isTwoFactorAuthenticationEnabled: false,
//       },
//       message: 'login successfully',
//     });
//   }
// });

// 2FA ************************************************************************* |

// exports.generateTwoFactorAuthCode = catchAsync(async (req, res, next) => {
//   // Generate 2FA code.
//   const { otpauthUrl, base32 } = getTwoFactorAuthenticationCode();

//   // Save 2FA code in the database.
//   await User.findByIdAndUpdate(req.user.id, {
//     twoFactorAuthenticationCode: base32,
//   });

//   respondWithQRCode(otpauthUrl, res);
// });

// exports.turnOnTwoFactorAuth = catchAsync(async (req, res, next) => {
//   const { twoFactorAuthenticationCode } = req.body;
//   const user = req.user;
//   const isCodeValid = await verifyTwoFactorAuthenticationCode(
//     twoFactorAuthenticationCode,
//     user
//   );
//   if (!isCodeValid) {
//     return next(new AppError(401, 'Incorrect email or password'));
//   }

//   await User.findByIdAndUpdate(user._id, {
//     isTwoFactorAuthenticationEnabled: true,
//   });

//   res.json({ success: true, message: '2FA enabled successfully' });
// });

// exports.secondFactorAuthentication = async (req, res, next) => {
//   const { twoFactorAuthenticationCode } = req.body;
//   const user = req.user;

//   const isCodeValid = await verifyTwoFactorAuthenticationCode(
//     twoFactorAuthenticationCode,
//     user
//   );
//   if (!isCodeValid) {
//     return next(new AppError(401, 'Code is not valid'));
//   }

//   user.setCookieToken(req, res, true);

//   res.send({
//     ...user.toObject(),
//     password: undefined,
//     twoFactorAuthenticationCode: undefined,
//   });
// };

// // Forgot Password ************************************************************* |
// exports.forgotPassword = catchAsync(async (req, res, next) => {
//   // Validate user email
//   const existingUser = await User.findOne({ email: req.body.email });
//   if (!existingUser)
//     return next(new AppError('User with email address does not exist', 401));

//   // Generate reset password token
//   const passwordResetToken = existingUser.createPasswordResetToken();
//   await existingUser.save({ validateBeforeSave: false }); // At this point you are setting password reset token and saving
//   // The save method will run validations on inputs and will fail due to the lack of for example confirm password etc
//   // set validateBeforeSave: false for this particular operation as we do not need confirm password validation here

//   // Send to user as an email
//   const resetPasswordUrl = `${req.protocol}://${req.get(
//     'host'
//   )}/api/v1/auth/resetPassword/${passwordResetToken}`;
//   const message = `Forgot your password, submit a request with your new password and password confirm
//         to: ${resetPasswordUrl}.\nIf you didn't forget your password, please ignore this email
//     `;
//   const subject = 'Reset your password(valid for 10mins)';

//   try {
//     await sendPlainEmail({ email: existingUser.email, subject, message });

//     res.json({
//       status: true,
//       message: 'Password reset has been sent to email',
//     });
//   } catch (error) {
//     existingUser.passwordResetToken = undefined;
//     existingUser.passwordResetExpiresIn = undefined;
//     existingUser.save();
//     // await existingUser.save({ validateBeforeSave: false })
//     return next(
//       new AppError(
//         'Cannot send password reset email at the moment, please try again later',
//         500
//       )
//     );
//   }
// });

// exports.resetPassword = catchAsync(async (req, res, next) => {
//   // Hash unhashed password reset token
//   const currentHashedToken = crypto
//     .createHash('sha256')
//     .update(req.params.token)
//     .digest('hex');

//   // Find a user with this hashed token
//   const existingUser = await User.findOne({
//     passwordResetToken: currentHashedToken,
//     passwordResetExpiresIn: { $gt: Date.now() },
//   });
//   if (!existingUser)
//     return next(new AppError('Token is either invalid or has expired', 400));

//   existingUser.password = req.body.password;
//   existingUser.confirmPassword = req.body.confirmPassword;
//   existingUser.passwordResetToken = undefined;
//   existingUser.passwordResetExpiresIn = undefined;
//   await existingUser.save();

//   // Generate token
//   const token = generateToken(existingUser);

//   res.json({ status: true, data: token, message: 'Password reset successful' });
// });

// exports.logoutCookie = catchAsync(async (req, res, next) => {
//   res.cookie('token', 'loggedout', {
//     expires: new Date(Date.now() + 10 * 1000),
//     httpOnly: true,
//   });

//   res.json({ status: true, message: 'Logout successful' });
// });
