const express = require('express');
const zendesk = require('../models/zendesk');

const router = express.Router();

router.get('/requests/:email', (req, res) => { zendesk.getAllTickets(req, res); });

module.exports = router;
