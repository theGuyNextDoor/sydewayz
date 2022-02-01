module.exports = {
  getPendingUsers: `
    SELECT * FROM users WHERE zendesk_id IS NULL;
    `,
};
