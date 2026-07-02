const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST create message (contact form submission)
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
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
