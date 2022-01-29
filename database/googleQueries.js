module.exports = {
  getUser: `
    Select * from users where email = $1;
    `,
  postUser: `
    INSERT INTO users (email, full_name, first_name, last_name, google_id, photo_url)
    VALUES ($1, $2, $3, $4, $5, $6);
    `,
};
