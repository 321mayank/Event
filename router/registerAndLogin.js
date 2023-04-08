const express = require('express');

const app = express();
const session = require('express-session');

const registerAndLogin_router = express.Router();

const {
  
  register,
  sessionChecker,
  login,
} = require('../controller/registerAndLogin');

registerAndLogin_router.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);

registerAndLogin_router.post('/register', register);

registerAndLogin_router.post('/login',sessionChecker, login);

module.exports = registerAndLogin_router;
