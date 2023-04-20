const express = require('express');
const session = require('express-session');

const registerRouter = express.Router();

const {
  registerRender,
  register
} = require('../../controller/registerAndLogin/register');

const { sessionChecker} = require('../../session/session')

const { sendEmail } = require('../../controller/mail')

registerRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);


registerRouter.get('/register', sessionChecker ,registerRender,);
registerRouter.post('/register', register);

registerRouter.get('/sendEmail', sendEmail);



module.exports = registerRouter;
