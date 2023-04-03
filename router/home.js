const express = require('express')
const shortid = require('shortid')
const app = express()
const session = require('express-session')
const home_router = express.Router()
const {  organisationRegister_render , organisationRegister,home } = require('../controller/home')


home_router.use(session({
  secret: 'abdjjdirgnkszvvk',
  resave: true,
  saveUninitialized: true
}))


home_router.get('/organisation-register', organisationRegister_render)
     
home_router.post('/organisation-register',organisationRegister) 

home_router.get('/home',home );


    module.exports = home_router