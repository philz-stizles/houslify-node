const sharedSchemas = require('./schemas/shared.schemas');
const authSchemas = require('./schemas/auth.schemas');
const userSchemas = require('./schemas/user.schemas');
const apartmentSchemas = require('./schemas/apartment.schemas');
const hotelSchemas = require('./schemas/hotel.schemas');
const realEstateSchemas = require('./schemas/real-estate.schemas');
const coworkingSpaceSchemas = require('./schemas/coworking-space.schemas');
const bookingSchemas = require('./schemas/booking.schemas');
const transactionSchemas = require('./schemas/transaction.schemas');
const notificationSchemas = require('./schemas/notification.schemas');
const subscriptionSchemas = require('./schemas/subscription.schemas');
const locationSchemas = require('./schemas/location.schemas');

module.exports = {
  schemas: {
    ...sharedSchemas,
    ...authSchemas,
    ...userSchemas,
    ...apartmentSchemas,
    ...hotelSchemas,
    ...realEstateSchemas,
    ...coworkingSpaceSchemas,
    ...bookingSchemas,
    ...transactionSchemas,
    ...notificationSchemas,
    ...subscriptionSchemas,
    ...locationSchemas,
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  responses: {
    UnauthorizedError: {
      description: 'Access token is missing or invalid',
    },
  },
};
