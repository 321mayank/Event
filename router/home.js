
const {connection_sql} = require('../database/sql_connection')
const express = require('express')
const app = express()
const session = require('express-session')
const home_router = express.Router()
const bodyParser = require('body-parser');
home_router.use(session({
  secret: 'abdjjdirgnkszvvk',
  resave: true,
  saveUninitialized: true
}))


home_router.get('/organisation-register',(req,res)=>{

    res.render('organisationRegister')
     })
     
     home_router.post('/organisation-register',(req,res)=>{
      const userID = req.session.userID;
      const {name, email }  = req.body
      const orgID = shortid.generate();
      


      connection_sql.query(organisationRegisterQuery(orgID, name, email, userID), (err,result)=>{
        if (err) {
          console.log(err);
          res.send('An error occurred');
        } else {
          res.redirect('/home');


        }

      } )



     }) 

     home_router.get('/home', (req, res) => {
      const userID = req.session.userID;
      console.log(userID)
      const fetchQuery1 = `SELECT * FROM organization WHERE userID='${userID}'`;
      connection_sql.query(fetchQuery1, (err, result) => {
        if (err) {
          console.log(err);
          res.send('An error occurred');
        } else {
          if (result.length > 0) {
          console.log(result)
          const organizations = result.map(row => ({ orgID: row.orgID, name: row.name }));
          res.render('home', { organizations : result });
          }else {
         console.log('No organizations found for this user');}
         
        }
      });
    });


    module.exports = home_router