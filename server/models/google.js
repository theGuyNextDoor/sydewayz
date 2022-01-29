const db = require('../../database');
const google = require('../../database/googleQueries');

module.exports = {
  runPostGoogleUser: (req, res) => {
    const { email, name, familyName, givenName, id, photoUrl } = req.body;
    db.query(google.postUser, [email, name, familyName, givenName, id, photoUrl], (err) => {
      if (err) {
        console.log(err);
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
      let result = [];
      let profile;

      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else if (!rows.length) {
        res.status(200).send('No account found');
      } else if (!rows[0].registered) {
        res.status(200).send('You account is pending review');
      } else {
        profile = {
          id: rows[0].id,
          fullName: rows[0].full_name,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          phone: rows[0].phone,
          googleId: rows[0].google_id,
          registered: rows[0].registered,
        };
        result = [...result, profile];
        res.status(200).send(result);
      }
    });
  },
};
