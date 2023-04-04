const {connectionSql} = require('../database/sql_connection')
const express = require('express')
const shortid = require('shortid')
const app = express()
const {organisationRegisterQuery} = require('../database/query')
const bodyParser = require('body-parser' );


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const organisationRegister_render = (req,res)=>{
    res.render('organisationRegister')
}

const organisationRegister = (req,res)=>{
    const userID = req.session.userID;
    console.log(userID)
    const {name, email }  = req.body
    const orgID = shortid.generate();
    
    connectionSql.query (organisationRegisterQuery(orgID, name, email, userID), (err,result)=>{
      if (err) {
        console.log(err);
        res.send('An error occurred');
        } else {
        res.redirect('/home');
        }
    } )
}

const home = (req, res) => {
    const userID = req.session.userID;
    console.log(userID)
    const fetchQuery1 = `SELECT * FROM organization WHERE userID='${userID}'`;
    connectionSql.query(fetchQuery1, (err, result) => {
      if (err) {
        console.log(err);
        res.send('An error occurred');
        } else {
        if (result.length > 0) {
            
        const organizations = result.map(row => ({ orgID: row.orgID, name: row.name }));
        res.render('home', { organizations : result });
        // req.session.orgID = orgID
        }else {
       console.log('No organizations found for this user');}
       }
    });
}

module.exports={
    organisationRegister_render,
    organisationRegister,
    home
}