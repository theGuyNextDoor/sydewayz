const express = require('express');
const models = require('../models/google');

const router = express.Router();

router.get('/login/:email', (req, res) => { models.runGetUser(req, res); });
router.post('/register', (req, res) => { models.runPostUser(req, res); });

module.exports = router;
