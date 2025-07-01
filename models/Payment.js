const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['cash', 'credit', 'ewallet'], required: true },
  paidAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
