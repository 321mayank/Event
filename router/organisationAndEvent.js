const express = require('express');

const app = express();
const session = require('express-session');
const {
  addOrganisation,
  profileView,
  orgname_redirection,
  organisation_open,
  eventRegistration,
} = require('../controller/organisationAndEvent');

const organisationAndEventRouter = express.Router();
organisationAndEventRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);

organisationAndEventRouter.get('/addOrganisation', addOrganisation);

organisationAndEventRouter.get('/profile', profileView);

organisationAndEventRouter.get('/:orgName', orgname_redirection);

organisationAndEventRouter.get(`/:name/:orgName`, organisation_open);

organisationAndEventRouter.post('/EventRegistration', eventRegistration);

module.exports = organisationAndEventRouter;
