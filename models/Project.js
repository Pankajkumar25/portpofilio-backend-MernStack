const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['fullstack', 'frontend', 'backend', 'api', 'other'] },
  techStack: [{ type: String }],
  images: [{ url: String, publicId: String }],
  githubLink: { type: String },
  liveLink: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
