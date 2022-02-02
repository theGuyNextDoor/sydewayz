const db = require('../../database');
const admin = require('../../database/adminQueries');

module.exports = {
  runGetPendingUsers: (req, res) => {
    db.query(admin.getPendingUsers, (err, data) => {
      const { rows } = data;
      if (err) {
        res.status(400).send(err);
      } else {
        let users = [];
        let profile = {};

        rows.forEach((item) => {
          profile = {
            fullName: item.full_name,
            email: item.email,
            phone: item.phone,
            // photoUrl: item.photo_url,
            organization: item.organization,
          };
          users = [...users, profile];
        });
        res.status(200).send(users);
      }
    });
  },
  runUpdateEndUserZendeskId: (req, res) => {
    console.log('got here');
    const { id, email } = req.body;
    console.log('MODELS admin - id:\n', req.body);
    db.query(admin.updateEndUserZendeskId, [id, email], (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send('Updated Zendesk ID');
      }
    });
  },
  runDeleteUser: (req, res) => {
    const { email } = req.params;
    db.query(admin.deleteUser, [email], (err, data) => {
      if (err) {
        res.status(204).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
};
