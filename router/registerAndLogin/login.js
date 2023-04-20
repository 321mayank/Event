const express = require('express');
const session = require('express-session');
const loginRouter = express.Router()

const {
  loginRender,
  login,
} = require('../../controller/registerAndLogin/login');

const { sessionChecker} = require('../../session/session')

loginRouter.get('/login',sessionChecker ,loginRender );
loginRouter.post('/login' ,sessionChecker, login);

module.exports = loginRouter;