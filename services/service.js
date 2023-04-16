
const db = require('../models');
const  user  = db.user;
const organization = db.organization
const event = db.event

async function requestUserdataByEmail(email) {
  const foundUser = await user.findOne({ where: { email } });
  return foundUser;
}

async function createUser(info) {
     await user.create(info);
   
  }

async function requestOrganizationByUserid(userID) {
    const foundorganization = await organization.findAll({ where: { userID },attributes: ['name'] });
    return foundorganization;
  }

async function createOrganization(data) {
 await organization.create(data);

 }
  
 async function getOrganisationEventByOrgName(orgName){
  const foundevent = await event.findAll({ where: { orgName },attributes: ['eventName'] })
  return foundevent
}



async function creatEvent(data) {
  await event.create(data);
 
  }


module.exports = {
    requestUserdataByEmail,
    createUser,
    requestOrganizationByUserid,
    createOrganization,
    getOrganisationEventByOrgName,
    creatEvent
}
