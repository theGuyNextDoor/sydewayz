const { Client } = require('pg');
const { USER, HOST, DATABASE, PORT } = require('../config');

const connection = new Client({
  user: USER,
  database: DATABASE,
  host: HOST,
  port: PORT,
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to postgreSQL!');
  }
});

module.exports = connection;
