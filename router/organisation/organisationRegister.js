const express = require('express');
const session = require('express-session');

const organisationRegisterRouter = express.Router();
const { organisationRegisterRender, organisationRegister } = require('../../controller/organisation/organisationRegister');

organisationRegisterRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);


organisationRegisterRouter.get('/organisation-register', organisationRegisterRender);
organisationRegisterRouter.post('/organisation-register', organisationRegister);


module.exports = organisationRegisterRouter;