const request = require('supertest');
const app = require('../../app');
const Apartment = require('../../db/models/apartment');

const endpoint = '/api/v1/apartments';

describe('Apartment routes', () => {
  // Apartment List *************************************************************************** |
  describe('Apartment list route', () => {
    it(`has a route handler listening to ${endpoint} for post requests`, async () => {
      const response = await request(app).get(endpoint);
      expect(response.status).not.toEqual(404);
    });
  });

  // Apartment Detail *************************************************************************** |
  // describe('Apartment Detail route', () => {
  //   it('has a route handler listening to /api/apartments for post requests', async () => {
  //     const res = await request(app).get(`${endpoint}`);
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toHaveProperty('users');
  //   });
  // });
});