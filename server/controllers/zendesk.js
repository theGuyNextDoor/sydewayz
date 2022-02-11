const express = require('express');
const models = require('../models/zendesk');

const router = express.Router();

router.post('/createUser', (req, res) => { models.createUser(req, res); });
router.post('/createRequest', (req, res) => { models.createRequest(req, res); });
router.get('/requests/:zendeskId/:email', (req, res) => { models.getRequests(req, res); });

module.exports = router;
