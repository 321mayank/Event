const db = require('../models');
const  user  = db.user;
const organization = db.organization
async function requestUserdataByEmail(email) {
  const foundUser = await user.findOne({ where: { email } });
  return foundUser;
}

async function createUser(info) {
     await user.create(info);
   
  }

  async function requestOrganizationByUserid(userID) {
    const foundorganization = await organization.findOne({ where: { userID } });
    return foundorganization;
  }

  async function createOrganization(data) {
 await organization.create(data);

  
 }
  

module.exports = {
    requestUserdataByEmail,
    createUser,
    requestOrganizationByUserid,
    createOrganization
}
