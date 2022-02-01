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
            // id: item.id,
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
};
