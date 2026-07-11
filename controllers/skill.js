const Skill = require('../models/Skill');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getSkills = catchAsync(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1, name: 1 });
  res.json({ success: true, count: skills.length, data: skills });
});

exports.createSkill = catchAsync(async (req, res) => {
  const skill = await Skill.create(req.body);
  res.status(201).json({ success: true, data: skill });
});

exports.updateSkill = catchAsync(async (req, res) => {
  const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!skill) throw new AppError('Skill not found', 404);
  res.json({ success: true, data: skill });
});

exports.deleteSkill = catchAsync(async (req, res) => {
  const skill = await Skill.findByIdAndDelete(req.params.id);
  if (!skill) throw new AppError('Skill not found', 404);
  res.json({ success: true, message: 'Skill deleted' });
});
