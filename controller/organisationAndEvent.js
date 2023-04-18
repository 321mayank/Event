const { name } = require('ejs');
const url = require("url");
const { getOrganisationEventByOrgName ,creatEvent ,requestOrganizationByUserid} = require('../services/service');
const path = require('path');
const { lastIndexOf } = require('lodash');

function addOrganisation  (req, res)  {
  res.render('addOrganisation');
};

function profileView  (req, res) {
  const name = req.session.name;
  const { email } = req.session;
  res.render('profile', { name, email }); 
};

async function eventRegistrationRender (req,res) {
  const orgName = req.params.orgName; 
  req.session.orgName = orgName;
  const userID = req.session.userID;
  let data;
  try{
    data = await requestOrganizationByUserid(userID)
  }
  catch(ex){
    res.send("Cannot get the organisation data by userID ")
  }
  
  if (data) {
    const nameToMatch = orgName; 
    const foundName = data.find(org => org.name === nameToMatch);
  
    if (foundName) {
      res.render('EventRegistration')
    } else {
      
      console.log('Name not found!');
      res.send("Organisation does not exist ")
  
    }
  }

  res.render('EventRegistration')

}

async function eventRegistration (req, res, next)  {
  orgName = req.session.orgName
 const { eventName } = req.body
  const info ={ orgName , eventName }
  let result;
  try {
   result = await creatEvent(info)
  }
  catch(ex){
    res.send("error")
  }
  if (result){
    res.send("Event Registered")
  }
  else{
    res.send("next page")
  }
};

async function getEvent (req,res) {
const orgName = req.params.orgName;  
const userID = req.session.userID;
console.log(userID)
let data;
try{
  data = await requestOrganizationByUserid(userID)
}
catch(ex){
  res.send("Cannot get the organisation data by userID ")
}

if (data) {
  const nameToMatch = orgName; 
  const foundName = data.find(org => org.name === nameToMatch);

  if (foundName) {
    let result;
    try{
      result = await getOrganisationEventByOrgName(orgName)
      res.send(result)
    }
    catch(ex){
      res.send("Cannot get the event data ")
    }
  } else {
   
    console.log('Name not found!');
    res.send("Organisation does not exist ")

  }
}


}
module.exports = {
  addOrganisation,
  profileView,
  eventRegistrationRender,
  eventRegistration,
  getEvent
};
