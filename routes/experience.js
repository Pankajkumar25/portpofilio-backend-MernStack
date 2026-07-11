const express = require('express');
const router = express.Router();
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experience');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getExperiences);
router.post('/', protect, adminOnly, createExperience);
router.put('/:id', protect, adminOnly, updateExperience);
router.delete('/:id', protect, adminOnly, deleteExperience);

module.exports = router;
