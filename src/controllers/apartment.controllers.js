const { catchAsync } = require('../utils/api.utils');
const AppError = require('../errors/app.error');
const ApartmentServices = require('../services/app/apartment.services');

exports.createApartment = catchAsync(async (req, res, next) => {
  // Check if apartment name already exists.
  const existingApartment = await ApartmentServices.exists({
    name: req.body.name,
  });

  if (existingApartment) {
    throw new AppError(400, 'Apartment already exists');
  }

  // Create new apartment.
  const createdApartment = await new ApartmentServices().create({
    ...req.body,
    userId: req.user.id,
    createdBy: req.user.id,
  });

  res
    .status(201)
    .json({
      status: true,
      data: createdApartment,
      message: 'Created successfully',
    });
});

exports.getAllApartments = catchAsync(async (req, res, next) => {
  const apartments = await ApartmentServices.findAll();

  res.json({
    status: true,
    data: apartments,
    message: 'Retrieved successfully',
  });
});

// GET /apartments?location=Lagos,price[eq]=12&size=34567
// GET /apartments?page=1&limit=10
// GET /apartments?sort=createdAt:desc,name:desc
exports.getFilteredApartments = catchAsync(async (req, res) => {
  // Build query.
  const excludeFields = ['page', 'limit', 'sort'];
  const query = { ...req.query }
  excludeFields.forEach(field => delete query[field]);

  // Build pagination.
  let { page, limit, sort } = req.query;
  page = page && !isNaN(page) && parseInt(page) > 0 ? parseInt(page) : 1;
  limit = limit && !isNaN(limit) ? parseInt(limit) : 10;
  limit = limit < 10 ? 10 : limit > 100 ? 100 : limit;
  const offset = (page - 1) * limit;


  const apartments = await ApartmentServices.findFiltered(query, limit, offset, sort);

  res.json({
    status: true,
    data: apartments,
    message: 'Retrieved successfully',
  });
});

exports.getApartment =  catchAsync(async (req, res, next) => {
  res
    .json({ status: true, data: '', message: 'Retrieved successfully' });
});

exports.updateApartment =  catchAsync(async (req, res, next) => {
  res
    .json({ status: true, data: '', message: 'Updated successfully' });
});

exports.archiveApartment = catchAsync(async (req, res, next) => {
  res.json({ status: true, data: '', message: 'Deleted successfully' });
});


// USING HANDLER FACTORY
// const createTour = factory.createOne(Tour);
// const getAllTours = factory.getAll(Tour);
// const getTour = factory.getOne(Tour, { path: 'reviews' });
// const updateTour = factory.updateOne(Tour);
// const deleteTour = factory.deleteOne(Tour);

// CONTROLLERS
// const searchTours = catchAsync(async (req, res, next) => {
//   const searchTerm = req.query.search;

//   const tours = tours.filter(t => t.name.includes(searchTerm));

//   res
//     .status(200)
//     .json({ status: true, data: tours, message: 'retrieved successfully' });
// });

// const getToursWithin = catchAsync(async (req, res, next) => {
//   const { distance, latlng, unit } = req.params;
//   const [lat, lng] = latlng.split(',');
//   if (!lat || !lng)
//     return next(
//       new AppError(
//         'Please provide latitude and longitude the the format lat,lng',
//         400
//       )
//     );

//   const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

//   const tours = await Tour.find({
//     startLocation: {
//       $geoWithin: { $centerSphere: [[lng, lat], radius] },
//     },
//   });

//   res
//     .status(200)
//     .json({ status: true, data: tours, message: 'retrieved successfully' });
// });

// const getDistances = catchAsync(async (req, res, next) => {
//   const { latlng, unit } = req.params;
//   const [lat, lng] = latlng.split(',');
//   if (!lat || !lng)
//     return next(
//       new AppError(
//         'Please provide latitude and longitude the the format lat,lng',
//         400
//       )
//     );
//   const multiplier = unit === 'mi' ? 0.0000621371 : 0.001;
//   const distances = await Tour.aggregate([
//     {
//       $geoNear: {
//         near: { type: 'Point', coordinates: [lng * 1, lat * 1] },
//         distanceField: 'distance',
//         distanceMultiplier: multiplier,
//       },
//     },
//     {
//       $project: {
//         distance: 1,
//         name: 1,
//       },
//     },
//   ]);

//   res
//     .status(200)
//     .json({ status: true, data: distances, message: 'retrieved successfully' });
// });

// const getTourStats = catchAsync(async (req, res, next) => {
//   const stats = await Tour.aggregate([
//     {
//       $match: { ratingsAverage: { $lte: 4.5 } },
//     },
//     {
//       $group: {
//         // _id: null,
//         _id: { $toUpper: '$difficulty' },
//         count: { $sum: 1 },
//         avgRating: { $avg: '$ratingsAverage' },
//         avgPrice: { $avg: '$price' },
//         minPrice: { $min: '$price' },
//         maxPrice: { $max: '$price' },
//       },
//     },
//     {
//       $sort: { avgPrice: -1 },
//     },
//   ]);

//   res.json({ status: true, data: stats, message: 'retrieved successfully' });
// });

// const getMonthlyPlan = catchAsync(async (req, res, next) => {
//   const year = +req.params.year;
//   const plan = await Tour.aggregate([
//     {
//       $unwind: '$startDates',
//     },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`${year}-01-01`),
//           $lte: new Date(`${year}-12-31`),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: '$startDates' },
//         numTourStarts: { $sum: 1 },
//         tours: { $push: '$name' },
//       },
//     },
//     {
//       $addFields: { month: '$_id' },
//     },
//     {
//       $project: { _id: 0 },
//     },
//     {
//       $sort: { numTourStarts: -1 },
//     },
//     {
//       $limit: 1,
//     },
//   ]);

//   res.json({ status: true, data: plan, message: 'retrieved successfully' });
// });

// module.exports = {
//   createTour,
//   updateTour,
//   getAllTours,
//   getTour,
//   deleteTour,
//   searchTours,
//   getTourStats,
//   getMonthlyPlan,
//   getToursWithin,
//   getDistances,
// };
