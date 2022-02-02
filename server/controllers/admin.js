const express = require('express');
const models = require('../models/admin');

const router = express.Router();

router.get('/pending', (req, res) => { models.runGetPendingUsers(req, res); });
router.delete('/deleteUser/:email', (req, res) => { models.runDeleteUser(req, res); });
router.put('/updateId', (req, res) => { models.runUpdateEndUserZendeskId(req, res); });

module.exports = router;
