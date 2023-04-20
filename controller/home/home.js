const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { requestOrganizationByUserid } = require('../../services/service');

// Set up middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handler function for rendering the home page
async function home (req, res) {
  const { userID } = req.session;

  // Get organizations associated with the user
  const results = await requestOrganizationByUserid(userID);

  if (results.length > 0) {
    // If organizations exist, extract and format relevant data
    const organizationData = results.map(result => result.get({ plain: true }));
    const organizations = organizationData.map(row => ({ orgID: row.orgID, name: row.name }));

    // Render the home page with the organization data
    res.render('home', { organizations: organizations });
  } else {
    // If no organizations exist, log the error message
    console.log('No organizations found for this user');
  }
};

// Export the home function for use in other modules
module.exports = {
  home,
};
