const express = require('express')
const app = express()
const session = require('express-session')
const registerAndLogin_router = express.Router()

const  {register_render, register, login_render,login } = require('../controller/registerAndLogin')
registerAndLogin_router.use(session({
  secret: 'abdjjdirgnkszvvk',
  resave: true,
  saveUninitialized: true
}))

 
registerAndLogin_router.get("/register", register_render);

registerAndLogin_router.post("/register", register)



registerAndLogin_router.get('/login', login_render);
registerAndLogin_router.post('/login', login); 



 


   
   module.exports = registerAndLogin_router