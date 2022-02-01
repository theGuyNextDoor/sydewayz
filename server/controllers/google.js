const express = require('express');
const database = require('../models/google');

const router = express.Router();

router.get('/login/:email', (req, res) => { database.runGetUser(req, res); });
router.post('/register', (req, res) => { database.runPostUser(req, res); });

module.exports = router;
