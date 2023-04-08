const { connectionSql } = require('../database/sql_connection');

const addOrganisation = (req, res) => {
  res.render('addOrganisation');
};

const profileView = (req, res) => {
  const name = req.session.Uname;
  const { email } = req.session;
  res.render('profile', { name, email });
};

const orgname_redirection = (req, res) => {
  const name = req.session.Uname;
  const { orgName } = req.params;
  res.redirect(`/${name}/${orgName}`);
};

const organisation_open = (req, res) => {
  const { orgName } = req.params;
  const { orgID } = req.session;
  const eventCheckQuery = `SELECT * FROM event WHERE orgID='${orgID}'`;
  connectionSql.query(eventCheckQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send('An error occurred');
    } else if (result.length > 0) {
      res.send('h');
    } else {
      res.render('EventRegistration');
    }
  });
};

const eventRegistration = (req, res) => {
  const { name } = req.body;
  const { orgID } = req.session;
  console.log(orgID);
  const EventRegistrationQuerry = `INSERT INTO event (orgID, event_name) VALUES ('${orgID}','${name}')`;
  connectionSql.query(EventRegistrationQuerry, (err, result) => {
    if (err) {
      console.log(err);
      res.send('An error occurred');
    } else {
      res.send('success');
    }
  });
};

module.exports = {
  addOrganisation,
  profileView,
  orgname_redirection,
  organisation_open,
  eventRegistration,
};
