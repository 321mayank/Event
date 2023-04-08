const shortid = require('shortid');
const bcrypt = require('bcrypt');
const db = require('../models')
const { hashPassword } = require('../security/password_hash');
const { register_valid } = require('../validation/validation');

const user = db.user
const organization = db.organization

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
        if (inputHash === passHash) {
        req.session.userID = userID;
        req.session.Uname = name;
        req.session.email = email;

        const checkOrganization = await user.findOne({ where: { userID: userID }})
        if(checkOrganization){
          res.redirect('/home');
        } else {
          res.redirect('/organisation-register');
        }
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
