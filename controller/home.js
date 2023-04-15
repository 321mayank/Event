const { connectionSql } = require('../database/sql_connection');
const express = require('express');
const shortid = require('shortid');

const app = express();
const bodyParser = require('body-parser');
const { requestOrganizationByUserid ,createOrganization } = require('../services/service');
const { func } = require('joi');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const organisationRegisterRender = (req, res) => {
  res.render('organisationRegister');
};

async function organisationRegister(req, res) {
  const { userID } = req.session;
  console.log(userID);
  const { name, email } = req.body;
  const orgID = shortid.generate();

  const data= {
    orgID, 
    name, 
    email, 
    userID

  }
  try{
  await createOrganization(data)
  res.redirect('/home');
  } catch (ex) {
    res.status(500).send();
    return;
  }
  }

  async function home (req, res) {
    const { userID } = req.session;
    const results = await requestOrganizationByUserid(userID);
    if (results.length > 0) {
      const organizationData = results.map(result => result.get({ plain: true }));
      const organizations = organizationData.map(row => ({ orgID: row.orgID, name: row.name }));
      res.render('home', { organizations: organizations });
    } else {
      console.log('No organizations found for this user');
    }
  };


module.exports = {
  organisationRegisterRender,
  organisationRegister,
  home,
};
