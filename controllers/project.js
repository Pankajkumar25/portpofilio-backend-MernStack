const Project = require('../models/Project');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getProjects = catchAsync(async (req, res) => {
  const { category, search, featured } = req.query;
  const query = {};
  if (category) query.category = category;
  if (featured) query.featured = featured === 'true';
  if (search) query.title = { $regex: search, $options: 'i' };
  const projects = await Project.find(query).sort({ featured: -1, order: 1, createdAt: -1 });
  res.json({ success: true, count: projects.length, data: projects });
});

exports.getProject = catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new AppError('Project not found', 404);
  res.json({ success: true, data: project });
});

exports.createProject = catchAsync(async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

exports.updateProject = catchAsync(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!project) throw new AppError('Project not found', 404);
  res.json({ success: true, data: project });
});

exports.deleteProject = catchAsync(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new AppError('Project not found', 404);
  res.json({ success: true, message: 'Project deleted' });
});
