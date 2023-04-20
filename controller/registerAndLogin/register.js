// Import necessary modules and functions
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { registerData} = require('../../validation/validation')
const { hashPassword ,hash} = require('../../security/password_hash');
const { requestUserdataByEmail ,createUser } = require('../../services/service');

// Function to render registration page
function registerRender(req,res){
  res.render('register')
}
  
// Function to handle registration requests
async function register(req, res, next) {
  
  // Validate registration data
  const { error, value } = registerData.body.validate(req.body)
  if (error) {
    const errorMessage = error.details[0].message;
    console.log(errorMessage);
    res.send(errorMessage);
    return;
  } else {
    // Generate API key
    const apiKey = crypto.randomBytes(32).toString('hex');
    hashedApi = hash(apiKey)

    // Extract data from request body
    const { name, email, password } = req.body;

    // Generate salt and hash password
    const salt = await bcrypt.genSalt();
    const passHash = await hashPassword(password, salt); // used hashPassword to bcrypt password

    // Generate user ID
    const userID = shortid.generate();

    // Store user data in info object
    const info = {
      userID,
      name,
      email,
      password,
      salt,
      passHash,
      apiKey,
      hashedApi
    };

    // Check if email already exists in database
    const checkResult = await requestUserdataByEmail(email)
    if (checkResult) {
      res.send('email allready exist');
    } else {
      // Create user in database and redirect to email verification page
      await createUser(info)
      res.redirect('/sendEmail');
    }
  }
}

// Export functions for use in other modules
module.exports = {
  registerRender,
  register,
};
