module.exports = {
  getPendingUsers: `
    SELECT * FROM users WHERE zendesk_id IS NULL;
    `,
  deleteUser: `
    DELETE FROM users WHERE email = $1;
    `,
};
