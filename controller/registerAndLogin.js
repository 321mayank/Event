const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { loginQuery, registerQuery, organizationCheckQuery } = require('../database/query');
const db = require('../models')
const { connectionSql } = require('../database/sql_connection');
const { hashPassword } = require('../security/password_hash');
const { register_valid } = require('../validation/validation');

const user = db.user

register_render = (req, res) => {
  res.render('register');
};

async function register(req, res, next) {
  const data = register_valid.body.validate(req.body);
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const passHash = await hashPassword(password, salt); // used hashPassword to bcrypt password
  const userID = shortid.generate();
  console.log(salt);
  console.log(passHash);

  let info = {
    userID, name, email, password, salt,passHash
  }
  
const checkResult = await user.findOne({ where: { email: email }})
  console.log(checkResult)

  if (checkResult) {
    res.send('email allready exist');
  } else {
    const sendData = await user.create(info)
    res.send('User registerd Successfully');
  }

}

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

async function login  (req, res) {
  // const data = login.body.validate(req.body)
  const { email, password } = req.body;
  console.log(email);

  const fetchQuery = loginQuery(email);
  console.log(fetchQuery);

  const checkResult = await user.findOne({ where: { email: email }})
   if (checkResult){
    const { userID, name, passHash , salt } = checkResult;
    console.log("name",name)
    const inputHash = await hashPassword(password, salt);
   


  // connectionSql.query(fetchQuery, async (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.send('An error occurred');
  //   } else if (result.length > 0) {
  //     const { userID, name, hash, salt } = result[0];

  //     const inputHash = await hashPassword(password, salt);

      if (inputHash === passHash) {
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
  }

module.exports = {
  register_render,
  register,
  sessionChecker,
  login_render,
  login,
};
