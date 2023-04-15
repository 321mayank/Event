const { name } = require('ejs');
const url = require("url");
const { getOrganisationEventByOrgName ,creatEvent} = require('../services/service');
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

// const orgnameRedirection = (req, res) => {
//   const name = req.session.name;
//   const { orgName } = req.params;
//   res.redirect(`/${name}/${orgName}`);
// };

// async function organisationOpen  (req, res) {
//   const name = req.params.name;
//   const result = await requestEventDataByorgID(name)
   
//   if (result.length > 0) {
//       res.send('Event allready registered');
//     } else {
//       res.render('EventRegistration');
//     }
//   }

function eventRegistrationRender (req,res) {
  const orgName = req.params.orgName; 
  req.session.orgName = orgName;
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
let result;
try{
  result = await getOrganisationEventByOrgName(orgName)
  res.send(result)
}
catch(ex){
  res.send("Cannot get the event data ")
}


}
module.exports = {
  addOrganisation,
  profileView,
  eventRegistrationRender,
  eventRegistration,
  getEvent
};
