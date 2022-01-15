const { check, validationResult } = require('express-validator');


exports.apartmentCreateValidator = [
  check('name').not().isEmpty().withMessage('Apartment name is required'),
  check('bed').not().isEmpty().withMessage('Number of beds is required'),
  check('bath').not().isEmpty().withMessage('Number of baths is required'),
  check('size').not().isEmpty().withMessage('Apartment size is required'),
  check('price').not().isEmpty().withMessage('Apartment price is required'),
];

exports.signupValidator = [
  check('name').not().isEmpty().withMessage('Apartment name is required'),
];

exports.loginValidator = [
  check('name').not().isEmpty().withMessage('Apartment name is required'),
];

// exports.categoryUpdateValidator = [
//   check('name').not().isEmpty().withMessage('Category name is required'),
//   check('content').isLength({ min: 20 }).withMessage('Content is required'),
// ];

// exports.linkCreateValidator = [
//   [
//     check('title').not().isEmpty().withMessage('Title is required'),
//     check('url').not().isEmpty().withMessage('URL is required'),
//     check('categories').not().isEmpty().withMessage('Pick a category'),
//     check('type').not().isEmpty().withMessage('Pick a type'),
//     check('medium').not().isEmpty().withMessage('Pick a medium - video/book'),
//   ],
// ];

// exports.linkUpdateValidator = [
//   [
//     check('title').not().isEmpty().withMessage('Title is required'),
//     check('url').not().isEmpty().withMessage('URL is required'),
//     check('categories').not().isEmpty().withMessage('Pick a category'),
//     check('type').not().isEmpty().withMessage('Pick a type'),
//     check('medium').not().isEmpty().withMessage('Pick a medium - video/book'),
//   ],
// ];

exports.requestValidation = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      data: errors.array()[0].msg,
    });
  }

  next();
};
