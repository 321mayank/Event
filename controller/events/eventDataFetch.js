const { getOrganisationEventByOrgName ,requestOrganizationByUserid} = require('../../services/service');

async function getEvent (req,res) {
    const orgName = req.params.orgName;  // get organisation name from URL parameter
    const userID = req.session.userID;  // get user ID from session
    let data;
    try{
      data = await requestOrganizationByUserid(userID)  // request organisation data from service
    }
    catch(ex){
      res.send("Cannot get the organisation data by userID ")  // send error message if organisation data cannot be retrieved
    }
    
    if (data) {
      const nameToMatch = orgName; 
      const foundName = data.find(org => org.name === nameToMatch);  // find the organisation with the name specified in the URL parameter
    
      if (foundName) {
        let result;
        try{
          result = await getOrganisationEventByOrgName(orgName)  // request event data for the specified organisation name from service
          res.send(result)  // send event data as response
        }
        catch(ex){
          res.send("Cannot get the event data ")  // send error message if event data cannot be retrieved
        }
      } else {
       
        console.log('Name not found!');
        res.send("Organisation does not exist ")  // send error message if organisation with specified name does not exist
    
      }
    }
}

module.exports = {
    getEvent
};
