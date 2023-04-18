const { isEmpty, cloneWith } = require('lodash');
const express = require('express');
const app = express();
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { hashPassword ,hash} = require('../security/password_hash');
const { registerData, loginData} = require('../validation/validation')
const { requestUserdataByEmail ,createUser ,requestOrganizationByUserid } = require('../services/service');



function sessionChecker  (req, res, next) {
   const userid = req.session.userID
   console.log(userid)
  if (userid) {
    res.redirect('/home');
  } else {
    next();
  }
};

function registerRender(req,res){
  res.render('register')
}

async function register(req, res, next) {

const { error, value } = registerData.body.validate(req.body) // validation
 if (error) {
  const errorMessage = error.details[0].message;
  console.log(errorMessage);
  res.send(errorMessage);
    return;
  } else { // api key Generation
  const apiKey = crypto.randomBytes(32).toString('hex');
  hashedApi = hash(apiKey)

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
    apiKey,
    hashedApi
};
  const checkResult = await requestUserdataByEmail(email)
  if (checkResult) {
    res.send('email allready exist');
  } else {
    await createUser(info)
    res.send('User registerd Successfully');
  }
 }
}



function loginRender(req,res,next){
  res.render('login')
  next()
}


async function login(req, res) {
const { error, value } = loginData.body.validate(req.body)
  if (error) {
   const errorMessage = error.details[0].message;
   console.log(errorMessage);
   res.send(errorMessage);
     return;
   } else {
    const { email, password } = req.body;

  let result;
  try {
    result = await requestUserdataByEmail(email)
  } catch (ex) {
    res.status(500).send();
    return;
  }

  if (result) {
    const { userID, name, passHash, salt } = result;
    const inputHash = await hashPassword(password, salt);
    if (inputHash === passHash) {
      req.session.userID = userID;
      req.session.name = name;
      req.session.email = email;

      const checkOrganization = await requestOrganizationByUserid(userID)
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
}

module.exports = {
  registerRender,
  register,
  sessionChecker,
  loginRender,
  login,
};
