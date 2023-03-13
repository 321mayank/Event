const connection_sql = require('./sql_connection')

const loginQuery = (email, password)=>{
  return `SELECT * FROM user WHERE email='${email}'`
}

const registerQuery = (name, email, password, passHash, salt)  => {
    return `INSERT INTO user (name, email, password, hash ,salt) VALUES ('${name}', '${email}', '${password}','${passHash}','${salt}')`
  };

  module.exports={
    loginQuery,
    registerQuery
  }