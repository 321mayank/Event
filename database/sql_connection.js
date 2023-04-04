const mysql = require('mysql');

const connectionSql = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'event',
});

module.exports = {
  connectionSql
};
