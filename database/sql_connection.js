const mysql = require('mysql');

const connectionSql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'event',
});

module.exports = {
  connectionSql,
};


//mysql2 
//orm object relational model - sequalize
// chai mocha - testing freamework
//