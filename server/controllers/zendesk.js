const express = require('express');
const models = require('../models/zendesk');

const router = express.Router();

router.post('/createUser', (req, res) => { models.createUser(req, res); });
router.get('/requests/:email', (req, res) => { models.getAllTickets(req, res); });

module.exports = router;
