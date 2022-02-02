module.exports = {
  getPendingUsers: `
    SELECT * FROM users
    WHERE zendesk_id IS NULL;
    `,
  deleteUser: `
    DELETE FROM users
    WHERE email = $1;
    `,
  updateEndUserZendeskId: `
    UPDATE users
    SET zendesk_id = $1
    WHERE email = $2;
    `,
};
