const express = require('express');
const { authenticate } = require('../models/zoho');

const router = express.Router();

router.get('/oauth', (req, res) =>{ authenticate(req, res); });


module.exports = router;
