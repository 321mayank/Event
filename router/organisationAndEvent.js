const express = require('express');

const app = express();
const session = require('express-session');
const {
  addOrganisation,
  profileView,
  eventRegistration,
  eventRegistrationRender,
  getEvent
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

organisationAndEventRouter.get('/EventRegistration/:orgName',eventRegistrationRender)

organisationAndEventRouter.post('/EventRegistration',eventRegistration);

organisationAndEventRouter.get('/events/:orgName', getEvent )

module.exports = organisationAndEventRouter;
