const express = require('express');
const { getAppointments, cancelEvent } = require('../models/calendly');

const router = express.Router();

router.get('/appointments/:email', (req, res) =>{ getAppointments(req, res); });
// router.get('/calls', (req, res) =>{ getCalls(req, res); });
router.post('/cancel', (req, res) =>{ cancelEvent(req, res); });


module.exports = router;