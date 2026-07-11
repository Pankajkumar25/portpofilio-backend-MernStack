const Testimonial = require('../models/Testimonial');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getTestimonials = catchAsync(async (req, res) => {
  const testimonials = await Testimonial.find({ featured: true }).sort({ order: 1, createdAt: -1 });
  if (testimonials.length === 0) {
    const all = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, count: all.length, data: all });
  }
  res.json({ success: true, count: testimonials.length, data: testimonials });
});

exports.getAllTestimonials = catchAsync(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json({ success: true, count: testimonials.length, data: testimonials });
});

exports.createTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: testimonial });
});

exports.updateTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  res.json({ success: true, data: testimonial });
});

exports.deleteTestimonial = catchAsync(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  res.json({ success: true, message: 'Testimonial deleted' });
});
