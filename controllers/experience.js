const Experience = require('../models/Experience');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getExperiences = catchAsync(async (req, res) => {
  const { type } = req.query;
  const query = type ? { type } : {};
  const experiences = await Experience.find(query).sort({ startDate: -1 });
  res.json({ success: true, count: experiences.length, data: experiences });
});

exports.createExperience = catchAsync(async (req, res) => {
  const experience = await Experience.create(req.body);
  res.status(201).json({ success: true, data: experience });
});

exports.updateExperience = catchAsync(async (req, res) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!experience) throw new AppError('Experience not found', 404);
  res.json({ success: true, data: experience });
});

exports.deleteExperience = catchAsync(async (req, res) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) throw new AppError('Experience not found', 404);
  res.json({ success: true, message: 'Experience deleted' });
});
