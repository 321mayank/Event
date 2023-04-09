const express = require('express');

const app = express();
const session = require('express-session');

const registerAndLoginRouter = express.Router();

const {
  registerRender,
  register,
  sessionChecker,
  loginRender,
  login,
} = require('../controller/registerAndLogin');

registerAndLoginRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);


registerAndLoginRouter.get('/register', sessionChecker, registerRender);
registerAndLoginRouter.post('/register', register);

registerAndLoginRouter.get('/login', sessionChecker, loginRender);
registerAndLoginRouter.post('/login' , login);

module.exports = registerAndLoginRouter;
