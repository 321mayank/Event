const express = require('express');

const app = express();
const session = require('express-session');

const registerAndLoginRouter = express.Router();

const {
  registerRender,
  register,
  sessionChecker,
  loginRender,
  login,
} = require('../controller/registerAndLogin');

const { sendEmail } = require('../controller/mail')

registerAndLoginRouter.use(
  session({
    secret: 'abdjjdirgnkszvvk',
    resave: true,
    saveUninitialized: true,
  })
);


registerAndLoginRouter.get('/register', sessionChecker ,registerRender,);
registerAndLoginRouter.post('/register', register ,sendEmail);

registerAndLoginRouter.get('/sendEmail', sendEmail);

registerAndLoginRouter.get('/login', async (req,res,next) =>{
  res.send(200)
} );
registerAndLoginRouter.post('/login' ,sessionChecker, login);



module.exports = registerAndLoginRouter;
