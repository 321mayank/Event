const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { loginQuery, registerQuery, organizationCheckQuery } = require('../database/query');
const { connectionSql } = require('../database/sql_connection');
const { hashPassword } = require('../security/password_hash');
const { register_valid } = require('../validation/validation');

const register_render = (req, res) => {
  res.render('register');
};

  async function register (req, res, next)  {
  const data = register_valid.body.validate(req.body);
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const passHash = await hashPassword(password, salt); // used hashPassword to bcrypt password
  const userID = shortid.generate();

  console.log(salt);
  console.log(passHash);

  const checkQuery = `SELECT * FROM user WHERE email='${email}'`;
  connectionSql.query(checkQuery, (err, sql_value) => {
    // checking if email allready exist
    if (sql_value.length > 0) {
      res.send('email allready exist');
    } else {
      const insertQuery = registerQuery(userID, name, email, password, passHash, salt);
      connectionSql.query(insertQuery, (err, result) => {
        // if no error then the insert query will execute and add the user to database
        if (err) {
          throw err;
        }
        console.log('User data inserted successfully');

        res.send('User registerd Successfully');
      });
    }
  });
};

const sessionChecker = (req, res, next) => {
  if (req.session.userID) {
    res.redirect('/home');
  } else {
    next();
  }
};

const login_render = (req, res) => {
  res.render('login');
};

const login = (req, res) => {
  // const data = login.body.validate(req.body)
  const { email, password } = req.body;
  console.log(email);

  const fetchQuery = loginQuery(email);
  console.log(fetchQuery);
  connectionSql.query(fetchQuery, async (err, result) => {
    if (err) {
      console.log(err);
      res.send('An error occurred');
    } else if (result.length > 0) {
      const { userID, name, hash, salt } = result[0];

      const inputHash = await hashPassword(password, salt);

      if (inputHash === hash) {
        req.session.userID = userID;
        req.session.Uname = name;
        req.session.email = email;

        connectionSql.query(organizationCheckQuery(userID), (err, result) => {
          if (err) {
            console.log(err);
            res.send('An error occurred');
          } else if (result.length > 0) {
            res.redirect('/home');
          } else {
            res.redirect('/organisation-register');
          }
        });
      } else {
        res.send('Email or password is incorrect');
      }
    } else {
      res.send('Email or password is incorrect');
    }
  });
};

module.exports = {
  register_render,
  register,
  sessionChecker,
  login_render,
  login,
};
