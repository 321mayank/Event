const express = require('express');
const session = require('express-session');

const homeRouter = express.Router();
const { home } = require('../../controller/home/home');

homeRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);



homeRouter.get('/home', home);


module.exports = homeRouter;


//auth if (api)
// get user data
