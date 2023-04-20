// Import necessary modules and functions
const { hashPassword} = require('../../security/password_hash');
const { loginData} = require('../../validation/validation')
const { requestUserdataByEmail ,createUser ,requestOrganizationByUserid } = require('../../services/service');
const redis = require('redis');
const client = redis.createClient({ host: 'localhost', port: 6379 });

// Function to render login page
function loginRender(req,res,next){
  res.render('login')
  next()
}

// Function to handle login requests
async function login(req, res) {
  // Validate login data
  const { error, value } = loginData.body.validate(req.body)
  if (error) {
    const errorMessage = error.details[0].message;
    console.log(errorMessage);
    res.send(errorMessage);
    return;
  } else {
    // Extract email and password from request body
    const { email, password } = req.body;

    let result;
    try {
      // Query user data by email
      result = await requestUserdataByEmail(email)
    } catch (ex) {
      res.status(500).send();
      return;
    }

    if (result) {
      // Extract user data from query result
      const { userID, name, passHash, salt ,hashedApi } = result;
      // Hash input password and compare with stored hash
      const inputHash = await hashPassword(password, salt);
      if (inputHash === passHash) {
        // Set user session data
        req.session.userID = userID;
        req.session.name = name;
        req.session.email = email;
        req.session.apiKey = hashedApi

        // Setup redis
        client.setEx("apikey",3600,hashedApi)

        // Check if user is associated with an organization
        const checkOrganization = await requestOrganizationByUserid(userID)
        if (checkOrganization) {
          // Redirect to home page if user is associated with an organization
          res.redirect('/home');
        } else {
          // Redirect to organization registration page if user is not associated with an organization
          res.redirect('/organisation-register');
        }
      } else {
        res.send('Email or password is incorrect');
      }
    } else {
      res.send('Email or password is incorrect');
    }
  }
}

// Export functions for use in other modules
module.exports = {
  loginRender,
  login,
};
