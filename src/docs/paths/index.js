const auth = require('./auth');
const users = require('./users');
const apartments = require('./apartments');
const hotels = require('./hotels');
const coworkingSpaces = require('./coworking-spaces');
const realEstate = require('./hotels');
const bookings = require('./bookings');
const reviews = require('./reviews');
const notifications = require('./notifications');
const subscriptions = require('./subscriptions');
const transactions = require('./transactions');

module.exports = {
  ...auth,
  ...users,
  ...apartments,
  ...hotels,
  ...coworkingSpaces,
  ...realEstate,
  ...bookings,
  ...reviews,
  ...notifications,
  ...subscriptions,
  ...transactions,
};
