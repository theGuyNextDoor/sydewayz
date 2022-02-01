const express = require('express');
const models = require('../models/admin');

const router = express.Router();

router.get('/pending', (req, res) => { models.runGetPendingUsers(req, res); });
router.delete('/deleteUser/:email', (req, res) => { models.runDeleteUser(req, res); });

module.exports = router;
