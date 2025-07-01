const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assigned later
  pickupLocation: String,
  dropoffLocation: String,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed'],
    default: 'pending'
  },
  requestedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ride', rideSchema);
