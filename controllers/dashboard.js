const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Testimonial = require('../models/Testimonial');
const Service = require('../models/Service');
const Contact = require('../models/Contact');
const Blog = require('../models/Blog');
const catchAsync = require('../utils/catchAsync');

exports.getStats = catchAsync(async (req, res) => {
  const [projects, skills, experiences, testimonials, services, messages, blogs, unreadMessages] = await Promise.all([
    Project.countDocuments(),
    Skill.countDocuments(),
    Experience.countDocuments(),
    Testimonial.countDocuments(),
    Service.countDocuments(),
    Contact.countDocuments(),
    Blog.countDocuments(),
    Contact.countDocuments({ read: false }),
  ]);
  const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5);
  const recentMessages = await Contact.find().sort({ createdAt: -1 }).limit(5);
  res.json({
    success: true,
    data: {
      stats: { projects, skills, experiences, testimonials, services, messages, blogs, unreadMessages },
      recentProjects,
      recentMessages,
    },
  });
});
