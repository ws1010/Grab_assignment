const express = require('express');
const router = express.Router();
const User = require('../models/temp');

// Register
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login (simple version)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }); // not secure, just basic
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ message: 'Login successful', user });
});

module.exports = router;

