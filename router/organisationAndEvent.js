const {connection_sql} = require('../database/sql_connection')
const express = require('express')
const app = express()
const session = require('express-session')
const organisationAndEvent_router = express.Router()
const bodyParser = require('body-parser');
organisationAndEvent_router.use(session({
  secret: 'abdjjdirgnkszvvk',
  resave: true,
  saveUninitialized: true
}))



    organisationAndEvent_router.get('/addOrganisation', (req,res)=>{
      res.render('addOrganisation') 
    })

    organisationAndEvent_router.get('/profile',(req,res)=>{
      const name = req.session.Uname;
      const email =  req.session.email
      res.render('profile', { name: name, email: email });
    })


    organisationAndEvent_router.get('/:orgName', (req, res) => {
      const name = req.session.Uname;
      const orgName = req.params.orgName;
      res.redirect(`/${name}/${orgName}`);
      
    });
    const name = session.Uname;
                          
    organisationAndEvent_router.get(`/:name/:orgName`, (req ,res)=>{
      const {orgName } = req.params;
      const orgID = req.session.orgID;
      const eventCheckQuery = `SELECT * FROM event WHERE orgID='${orgID}'`;
      connection_sql.query(eventCheckQuery, (err,result)=>{
                 
        if (err) {
            console.log(err);
            res.send('An error occurred'); 
        } else {
            if(result.length>0){
              res.send("h");
            } else {
              res.render('EventRegistration');
            }
        }

      })
      
    })


    organisationAndEvent_router.get('/EventRegistration',(req,res)=>{
      req.render('EventRegistration')
    })

    
   module.exports = organisationAndEvent_router