const express = require('express');
const router = express.Router();
const {
  createCoworkingSpace,
  updateCoworkingSpace,
  getAllCoworkingSpaces,
  getFilteredCoworkingSpaces,
  getCoworkingSpace,
  archiveCoworkingSpace,
  // getCoworkingSpacesWithin,
  // getDistances,
  // getCoworkingSpaceStats,
} = require('../controllers/coworking-space.controllers');
// const { aliasTopTours } = require('../middlewares/aliasMiddlewares');
// const { authenticate, authorize } = require('../middlewares/auth.middlewares');
// const reviewRouter = require('./review.routes'); // Using Nested routes with express
// const bookingRouter = require('./booking.routes'); // Using Nested routes with express
// const {
//   uploadTourPhotos,
//   resizeTourPhotos,
// } = require('../middlewares/multerMiddlewares');

// NESTED ROUTES
// router.use('/:tourId/reviews', reviewRouter); // Telling the TourRouter to use the reviewRouter
// // whenever the above url is matched --> route mounting a nested route
// router.use('/:tourId/bookings', bookingRouter);

// // ALIASING with middleware and reusing controllers
// router.route('/top5Cheap').get(aliasTopTours, getAllTours); // You need to put this route at the top above routes like
// // router.route('/:id') which a param that matches any(/:id), to ensure that this route will match when requested

// // AGGREGATION PIPELINE - Matching and Grouping
// router.route('/tourStats').get(getTourStats); // You need to put this route at the top above routes like
// // router.route('/:id') which a param that matches any(/:id), to ensure that this route will match when requested

// // GEO-SPATIAL QUERIES
// router.route('/within/:distance/center/:latlng/unit/:unit').get(getToursWithin);
// // Using query strings
// // router.route('/within').get(getToursWithin)
// // http://localhost:5000/within?distance=233&center=40,45&unit=mi

// // GEO-SPATIAL AGGREGATION
// router.route('/distances/:latlng/unit/:unit').get(getDistances);

// // UNWINDING
// router
//   .route('/monthlyPlan/:year')
//   .get(authenticate, authorize('admin', 'lead-guide', 'guide'), getMonthlyPlan); // You need to put this route at the top above routes like
// // router.route('/:id') which a param that matches any(/:id), to ensure that this route will match when requested

router
  .route('/')
  .post(createCoworkingSpace)
  .get(getAllCoworkingSpaces);

router.route('/filtered').get(getFilteredCoworkingSpaces);

router
  .route('/:id')
  .patch(
    // authenticate,
    // authorize('admin', 'lead-guide'),
    // uploadTourPhotos,
    // resizeTourPhotos,
    updateCoworkingSpace
  )
  .get(getCoworkingSpace)
  .delete(archiveCoworkingSpace);

module.exports = router;
