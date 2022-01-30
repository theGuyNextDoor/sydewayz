const db = require('../../database');
const google = require('../../database/googleQueries');

module.exports = {
  runPostGoogleUser: (req, res) => {
    const { email, name, familyName, givenName, photoUrl } = req.body;
    db.query(google.postUser, [email, name, familyName, givenName, photoUrl], (err) => {
      if (err) {
        res.status(201).send('Email already registered');
      } else {
        res.status(201).send('Your account is submitted for review');
      }
    });
  },
  runGetGoogleUser: (req, res) => {
    const { email } = req.params;
    db.query(google.getUser, [email], (err, data) => {
      const { rows } = data;
      console.log('MODELS google.js - user info from db: \n', rows);

      if (err) {
        res.status(400).send(err);
      } else if (!rows.length) {
        res.status(200).send('No account found');
      } else if (!rows[0].registered) {
        res.status(200).send('You account is pending review');
      } else {
        const profile = {
          id: rows[0].id,
          email: rows[0].email,
          fullName: rows[0].full_name,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          phone: rows[0].phone,
          photoUrl: rows[0].photo_url,
          registered: rows[0].registered,
          organization: rows[0].organization,
        };
        res.status(200).send([profile]);
      }
    });
  },
};
