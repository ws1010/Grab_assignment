const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Make a payment
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ message: 'Payment recorded', payment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all payments
router.get('/', async (req, res) => {
  const payments = await Payment.find().populate('rideId');
  res.json(payments);
});

module.exports = router;
