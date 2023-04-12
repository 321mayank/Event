const { expect } = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const app = require('../index');

describe('App', () => {
    describe('GET /register', () => {
      it('should render the register page', async () => {
        const res = await request(app).get('/register');
        expect(res.statusCode).to.equal(200);
        expect(res.text).to.include('Register');
      });
    });
})

describe('GET /login', () => {
    it('should render the login page', async () => {
      const res = await request(app).get('/login');
      expect(res.statusCode).to.equal(200);
      expect(res.text).to.include('Login');
    });
  });
