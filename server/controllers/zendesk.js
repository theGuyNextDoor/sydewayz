const express = require('express');
const zendesk = require('../models/zendesk');

const router = express.Router();

router.get('/tickets/:email', (req, res) => { zendesk.getAllTickets(req, res); });

module.exports = router;
