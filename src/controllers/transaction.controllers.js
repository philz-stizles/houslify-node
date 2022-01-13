const Apartment = require('../db/models/apartment');
const { catchAsync } = require('../utils/api.utils');
const AppError = require('../errors/app.error');
const ApartmentServices = require('../services/app/apartment.services');

exports.createApartment = catchAsync(async (req, res, next) => {
  const createdApartment = await new ApartmentServices().create(req.body);

  res.status(201).json({
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

exports.getFilteredApartments = catchAsync(async (req, res, next) => {
  res.json({ status: true, data: '', message: 'Retrieved successfully' });
});

exports.getApartment = catchAsync(async (req, res, next) => {
  res.json({ status: true, data: '', message: 'Retrieved successfully' });
});

exports.updateApartment = catchAsync(async (req, res, next) => {
  res.json({ status: true, data: '', message: 'Updated successfully' });
});

exports.archiveApartment = catchAsync(async (req, res, next) => {
  res.json({ status: true, data: '', message: 'Deleted successfully' });
});