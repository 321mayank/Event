// Import necessary modules and functions
const { getOrganisationEventByOrgName ,creatEvent ,requestOrganizationByUserid} = require('../../services/service');
const path = require('path');
const { lastIndexOf } = require('lodash');

// Render the event registration page
async function eventRegistrationRender (req,res) {
  // Get the organization name from the URL parameter and store it in the session
  const orgName = req.params.orgName; 
  req.session.orgName = orgName;
  const userID = req.session.userID;
  let data;
  try{
    // Get the organization data from the database using the user ID
    data = await requestOrganizationByUserid(userID)
  }
  catch(ex){
    res.send("Cannot get the organisation data by userID ")
  }
  
  if (data) {
    // Check if the organization name in the URL parameter matches any of the names in the organization data
    const nameToMatch = orgName; 
    const foundName = data.find(org => org.name === nameToMatch);
  
    if (foundName) {
      // If the organization name is found, render the event registration page
      res.render('EventRegistration')
    } else {
      // If the organization name is not found, send an error message
      console.log('Name not found!');
      res.send("Organisation does not exist ")
    }
  }

  res.render('EventRegistration')
}

// Handle event registration form submission
async function eventRegistration (req, res, next)  {
  // Get the organization name from the session and the event name from the form data
  orgName = req.session.orgName
  const { eventName } = req.body
  const info ={ orgName , eventName }
  let result;
  try {
    // Create the new event in the database
    result = await creatEvent(info)
  }
  catch(ex){
    res.send("error")
  }
  if (result){
    // If the event is successfully registered, send a success message
    res.send("Event Registered")
  }
  else{
    // If there is an error, send an error message
    res.send("Event Registered ")
  }
};

// Export the functions for use in other modules
module.exports = {
  eventRegistrationRender,
  eventRegistration,
};
