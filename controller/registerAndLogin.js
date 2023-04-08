const { isEmpty } = require('lodash');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const db = require('../models');
const { hashPassword } = require('../security/password_hash');
const { userLogin } = require('../validation/user');

const { user } = db;

async function register(req, res, next) {
  const data = register_valid.body.validate(req.body);
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const passHash = await hashPassword(password, salt); // used hashPassword to bcrypt password
  const userID = shortid.generate();

  const info = {
    userID,
    name,
    email,
    password,
    salt,
    passHash,
  };

  const checkResult = await user.findOne({ where: { email } });

  if (checkResult) {
    res.send('email allready exist');
  } else {
    await user.create(info);
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

async function login(req, res) {
  // const data = login.body.validate(req.body)
  const { email, password } = req.body;
  const { error, value } = userLogin(req.body);

  if (error) {
    res.send('invalid payload');
    return;
  }

  let result;
  try {
    result = await user.findOne({ where: { email: value.email } });
  } catch (ex) {
    res.statusCode(500).send();
    return;
  }

  if (isEmpty(result)) {
    const { userID, name, passHash, salt } = result;
    const inputHash = await hashPassword(password, salt);
    if (inputHash === passHash) {
      req.session.userID = userID;
      req.session.Uname = name;
      req.session.email = email;

      const checkOrganization = await user.findOne({ where: { userID } });
      if (checkOrganization) {
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
  register,
  sessionChecker,
  login,
};
