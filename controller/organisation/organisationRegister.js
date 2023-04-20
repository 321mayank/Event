// Import necessary modules and functions
const { createOrganization } = require('../../services/service');
const shortid = require('shortid');

// Render the organisation register page
function organisationRegisterRender(req, res) {
  res.render("organisationRegister");
}

// Register a new organisation
async function organisationRegister(req, res) {
  const { userID } = req.session;
  const { name, email } = req.body;

  // Generate a unique organisation ID using the shortid module
  const orgID = shortid.generate();

  // Create an object with the organisation data
  const data = {
    orgID,
    name,
    email,
    userID,
  };

  try {
    // Call the createOrganization function to add the organisation to the database
    await createOrganization(data);

    // Redirect the user to the home page
    res.redirect("/home");
  } catch (ex) {
    // If an error occurs, return a 500 status code and exit the function
    res.status(500).send();
    return;
  }
}

// Render the add organisation page
function addOrganisation  (req, res)  {
  res.render('addOrganisation');
};

// Export the functions for use in other files
module.exports = {
    organisationRegisterRender,
    organisationRegister,
};
