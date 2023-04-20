const express = require('express');

const session = require('express-session');
const { getEvent } = require('../../controller/events/eventDataFetch');

const { authenticateApiKey }= require('../../authorization/apiKeyAuth')

const eventRouter = express.Router();
eventRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);


eventRouter.get('/events/:orgName',authenticateApiKey, getEvent )
