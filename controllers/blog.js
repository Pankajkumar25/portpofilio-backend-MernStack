const Blog = require('../models/Blog');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getBlogs = catchAsync(async (req, res) => {
  const { published, tag } = req.query;
  const query = {};
  if (published) query.published = published === 'true';
  if (tag) query.tags = tag;
  const blogs = await Blog.find(query).sort({ createdAt: -1 });
  res.json({ success: true, count: blogs.length, data: blogs });
});

exports.getBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) throw new AppError('Blog not found', 404);
  blog.views += 1;
  await blog.save();
  res.json({ success: true, data: blog });
});

exports.createBlog = catchAsync(async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({ success: true, data: blog });
});

exports.updateBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!blog) throw new AppError('Blog not found', 404);
  res.json({ success: true, data: blog });
});

exports.deleteBlog = catchAsync(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) throw new AppError('Blog not found', 404);
  res.json({ success: true, message: 'Blog deleted' });
});
