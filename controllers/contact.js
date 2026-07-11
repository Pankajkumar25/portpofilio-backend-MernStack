const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const sendEmail = async (contact) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `Portfolio Contact: ${contact.subject}`,
    html: `<h3>New Contact Message</h3><p><strong>Name:</strong> ${contact.name}</p><p><strong>Email:</strong> ${contact.email}</p><p><strong>Subject:</strong> ${contact.subject}</p><p><strong>Message:</strong></p><p>${contact.message}</p>`,
  });
};

exports.sendMessage = catchAsync(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) throw new AppError('All fields are required', 400);
  const contact = await Contact.create({ name, email, subject, message });
  try { await sendEmail(contact); } catch (err) { console.error('Email failed:', err); }
  res.status(201).json({ success: true, message: 'Message sent successfully!' });
});

exports.getMessages = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const messages = await Contact.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
  const total = await Contact.countDocuments();
  res.json({ success: true, count: messages.length, total, pages: Math.ceil(total / limit), data: messages });
});

exports.markRead = catchAsync(async (req, res) => {
  const message = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!message) throw new AppError('Message not found', 404);
  res.json({ success: true, data: message });
});

exports.deleteMessage = catchAsync(async (req, res) => {
  const message = await Contact.findByIdAndDelete(req.params.id);
  if (!message) throw new AppError('Message not found', 404);
  res.json({ success: true, message: 'Message deleted' });
});
