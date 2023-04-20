const express = require('express');
const session = require('express-session');

const { authenticateApiKey }= require('../../authorization/apiKeyAuth')
const { profileView } = require('../../controller/profile/profileDisplay')

const profileRouter = express.Router();
profileRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);

profileRouter.get('/profile',authenticateApiKey , profileView);

module.exports= profileRouter;