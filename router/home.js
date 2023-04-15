const express = require('express');
const shortid = require('shortid');

const app = express();
const session = require('express-session');

const homeRouter = express.Router();
const { organisationRegisterRender, organisationRegister, home } = require('../controller/home');

homeRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);

homeRouter.get('/organisation-register', organisationRegisterRender);

homeRouter.post('/organisation-register', organisationRegister);

homeRouter.get('/home', home);


module.exports = homeRouter;
