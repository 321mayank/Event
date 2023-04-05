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

const organisationAndEvent_router = express.Router();
organisationAndEvent_router.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);

organisationAndEvent_router.get('/addOrganisation', addOrganisation);

organisationAndEvent_router.get('/profile', profileView);

organisationAndEvent_router.get('/:orgName', orgname_redirection);

organisationAndEvent_router.get(`/:name/:orgName`, organisation_open);

organisationAndEvent_router.post('/EventRegistration', eventRegistration);

module.exports = organisationAndEvent_router;
