const db = require('../../database');
const google = require('../../database/googleQueries');

module.exports = {
  runPostUser: (req, res) => {
    const { email, name, familyName, givenName, photo } = req.body;
    db.query(google.postUser, [name, givenName, familyName, email, photo], (err) => {
      if (err) {
        res.status(201).send('Email already registered, try logging in');
      } else {
        res.status(201).send('Your account has been submitted for review');
      }
    });
  },
  runGetUser: (req, res) => {
    const { email } = req.params;
    db.query(google.getUser, [email], (err, data) => {
      const { rows } = data;

      if (err) {
        res.status(400).send(err);
      } else if (!rows.length) {
        res.status(200).send('No account found');
      } else if (!rows[0].zendesk_id) {
        res.status(200).send('You account is pending review');
      } else {
        const profile = {
          // id: rows[0].id,
          fullName: rows[0].full_name,
          firstName: rows[0].first_name,
          lastName: rows[0].last_name,
          email: rows[0].email,
          phone: rows[0].phone,
          photoUrl: rows[0].photo_url,
          organization: rows[0].organization,
          zendeskId: rows[0].zendesk_id,
          isAdmin: rows[0].is_admin,
          roleId: rows[0].roles_id,

        };
        res.status(200).send([profile]);
      }
    });
  },
};
