const express = require('express');

const session = require('express-session');
const {
  eventRegistration,
  eventRegistrationRender,
  getEvent
} = require('../../controller/events/eventRegister');

const { authenticateApiKey }= require('../../authorization/apiKeyAuth')

const eventRegisterRouter = express.Router();
eventRegisterRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);

// organisationAndEventRouter.get('/addOrganisation',authenticateApiKey , addOrganisation);


eventRegisterRouter.get('/EventRegistration/:orgName',authenticateApiKey, eventRegistrationRender)

eventRegisterRouter.post('/EventRegistration',authenticateApiKey, eventRegistration);


module.exports = eventRegisterRouter;
