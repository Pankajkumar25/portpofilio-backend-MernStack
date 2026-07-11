const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/dashboard');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/stats', protect, adminOnly, getStats);

module.exports = router;
