const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// POST admin login
router.post('/login', (req, res) => {
  const { password } = req.body;

  const adminPassword = process.env.ADMIN_PASSWORD || 'vimean696969';

  if (password === adminPassword) {
    // Passwords match, issue token
    const payload = {
      user: {
        role: 'admin',
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'fallback_secret_for_development',
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token });
      }
    );
  } else {
    // Incorrect password
    res.status(401).json({ success: false, message: 'Invalid Admin Password' });
  }
});

// GET verify token route (to check if logged in on frontend load)
const auth = require('../middleware/auth');
router.get('/verify', auth, (req, res) => {
  res.json({ success: true, message: 'Token is valid' });
});

module.exports = router;
