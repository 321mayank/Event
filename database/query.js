const connection_sql = require('./sql_connection')

const loginQuery = (email, password)=>{
  return `SELECT * FROM user WHERE email='${email}'`
}

const registerQuery = (userID, name, email, password, passHash, salt)  => {
    return `INSERT INTO user (userID, name, email, password, hash ,salt) VALUES ('${userID}','${name}', '${email}', '${password}','${passHash}','${salt}')`
  };

const organizationCheckQuery=(userID)=>{
  return`SELECT * FROM organization WHERE userID='${userID}'`
}

const organisationRegisterQuery =(orgID, name, email, userID) =>{
  return`INSERT INTO organization (orgID, name, email, userID) VALUES ('${orgID}','${name}','${email}','${userID}')`
};

  module.exports={
    loginQuery,
    registerQuery,
    organizationCheckQuery,
    organisationRegisterQuery
  }