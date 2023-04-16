const { describe, it } = require('mocha');
const { expect} = require('chai');
const { loginData } = require('../validation/validation');

describe('Joi Validation Tests', () => {
  describe('loginData', () => {
    it('should validate correct input', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = loginData.body.validate(data);
      expect(result.error).to.be.undefined;
    });

    it('should return an error if email is missing', () => {
      const data = {
        password: 'password123',
      };
      const result = loginData.body.validate(data);
      expect(result.error.details[0].message).to.equal('"email" is required');
    });

    it('should return an error if email is invalid', () => {
      const data = {
        email: 'invalid-email',
        password: 'password123',
      };
      const result = loginData.body.validate(data);
      expect(result.error.details[0].message).to.equal('"email" must be a valid email');
    });

    it('should return an error if password is missing', () => {
      const data = {
        email: 'test@example.com',
      };
      const result = loginData.body.validate(data);
      expect(result.error.details[0].message).to.equal('"password" is required');
    });
  });
});
