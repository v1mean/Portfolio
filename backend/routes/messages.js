const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'meanv081@gmail.com',
    pass: process.env.EMAIL_APP_PASSWORD, // We will add this to .env
  },
});

// POST create message (contact form submission)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    // Send email notification
    if (process.env.EMAIL_APP_PASSWORD) {
      const mailOptions = {
        from: '"Portfolio Contact Form" <meanv081@gmail.com>',
        to: 'meanv081@gmail.com',
        subject: `New Portfolio Message: ${subject}`,
        html: `
          <h2>New Message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };
      
      try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent successfully');
      } catch (emailError) {
        console.error('❌ Failed to send email:', emailError);
        // We still return success because the message was saved to the DB
      }
    }

    res.status(201).json({ success: true, data: savedMessage, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// GET all messages (admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
