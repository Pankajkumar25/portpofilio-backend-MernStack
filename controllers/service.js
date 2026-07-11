const Service = require('../models/Service');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getServices = catchAsync(async (req, res) => {
  const services = await Service.find().sort({ order: 1 });
  res.json({ success: true, count: services.length, data: services });
});

exports.createService = catchAsync(async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json({ success: true, data: service });
});

exports.updateService = catchAsync(async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!service) throw new AppError('Service not found', 404);
  res.json({ success: true, data: service });
});

exports.deleteService = catchAsync(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) throw new AppError('Service not found', 404);
  res.json({ success: true, message: 'Service deleted' });
});
