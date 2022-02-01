module.exports = {
  postUser: `
    INSERT INTO users (full_name , first_name , last_name , email, photo_url)
    VALUES ($1, $2, $3, $4, $5);
    `,
  getUser: `
    Select * from users where email = $1;
    `,
};
