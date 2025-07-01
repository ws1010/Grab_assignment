const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// Request a ride
router.post('/request', async (req, res) => {
  try {
    const ride = new Ride(req.body);
    await ride.save();
    res.status(201).json({ message: 'Ride requested', ride });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Accept a ride (assign driver)
router.post('/accept/:id', async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ error: 'Ride not found' });

    ride.driverId = req.body.driverId;
    ride.status = 'accepted';
    await ride.save();

    res.json({ message: 'Ride accepted', ride });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all rides (for testing/admin)
router.get('/', async (req, res) => {
  const rides = await Ride.find().populate('riderId').populate('driverId');
  res.json(rides);
});

module.exports = router;
