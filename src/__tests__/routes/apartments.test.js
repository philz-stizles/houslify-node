const request = require('supertest');
const app = require('../../app');
const Apartment = require('../../db/models/apartment');

const endpoint = '/api/v1/apartments';

describe('Apartment routes', () => {
  // Apartment Create *************************************************************************** |
  describe('Apartment create route', () => {
    // const dummyApartment = {}

    // // Applies only to tests in this describe block
    // beforeEach(() => {
    //   // return initializeFoodDatabase();
    //   dummyApartment.name = 'dummy apartment name';
    //   dummyApartment.price = 10;
    // });

    it(`has a route handler listening to ${endpoint} for POST requests`, async () => {
      const response = await request(app).post(endpoint);
      expect(response.status).not.toEqual(404);
    });

//     it('can only be accessed if the user is authenticated', async () => {
//       await request(app).post(endpoint).send({}).expect(401);
//     });
// ;
//     it('returns a status other than 401 if the user is authenticated', async () => {
//       const cookie = global.signin();

//       const response = await request(app)
//         .post(endpoint)
//         .set('Cookie', cookie)
//         .send({});

//       expect(response.status).not.toEqual(401);
//     });

//     it('returns an error if an invalid name is provided', async () => {
//       dummyApartment.name = '';

//       await request(app)
//         .post(endpoint)
//         .set('Cookie', global.signin())
//         .send(dummyApartment)
//         .expect(400);

//       dummyApartment.name = undefined;

//       await request(app)
//         .post(endpoint)
//         .set('Cookie', global.signin())
//         .send(dummyApartment)
//         .expect(400);
//     });

//     it('returns an error if an invalid price is provided', async () => {
//       dummyApartment.price = -10;

//       await request(app)
//         .post(endpoint)
//         .set('Cookie', global.signin())
//         .send({ title: 'Test title', price: -10 })
//         .expect(400);
      
//       dummyApartment.price = undefined;

//       await request(app)
//         .post(endpoint)
//         .set('Cookie', global.signin())
//         .send({ title: 'Test title' })
//         .expect(400);
//     });
  });

  // Apartment List ***************************************************************************** |
  describe('Apartment list route', () => {
    it(`has a route handler listening to ${endpoint} for GET requests`, async () => {
      const response = await request(app).get(endpoint);
      expect(response.status).not.toEqual(404);
    });
  });

  // Apartment Detail *************************************************************************** |
  // describe('Apartment Detail route', () => {
  //   it('has a route handler listening to /api/apartments/id for GET requests', async () => {
  //     const res = await request(app).get(`${endpoint}`);
  //     expect(res.statusCode).toEqual(200);
  //     expect(res.body).toHaveProperty('users');
  //     expect(res.body).toHaveMatch('users');
  //   });
  // });

  // Apartment Update *************************************************************************** |
  // describe('Apartment create route', () => {
  //   it(`has a route handler listening to ${endpoint} for PUT requests`, async () => {
  //     const response = await request(app).pUT(endpoint);
  //     expect(response.status).not.toEqual(404);
  //   });
  // });
});