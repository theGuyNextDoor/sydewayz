const express = require('express');
const zendesk = require('../models/zendesk');

const router = express.Router();

router.get('/tickets', (req, res) => { zendesk.getAllTickets(req, res); });

module.exports = router;
