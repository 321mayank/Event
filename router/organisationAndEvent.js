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
const { authenticateApiKey }= require('../controller/apiKeyAuth')

const organisationAndEventRouter = express.Router();
organisationAndEventRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);

organisationAndEventRouter.get('/addOrganisation',authenticateApiKey , addOrganisation);

organisationAndEventRouter.get('/profile',authenticateApiKey , profileView);

organisationAndEventRouter.get('/EventRegistration/:orgName',authenticateApiKey, eventRegistrationRender)

organisationAndEventRouter.post('/EventRegistration',authenticateApiKey, eventRegistration);

organisationAndEventRouter.get('/events/:orgName',authenticateApiKey, getEvent )

module.exports = organisationAndEventRouter;
