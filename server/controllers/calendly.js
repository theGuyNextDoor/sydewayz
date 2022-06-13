const express = require('express');
const { getAppointments } = require('../models/calendly');

const router = express.Router();

router.get('/appointments/:email', (req, res) =>{ getAppointments(req, res); });
// router.get('/calls', (req, res) =>{ getCalls(req, res); });


module.exports = router;