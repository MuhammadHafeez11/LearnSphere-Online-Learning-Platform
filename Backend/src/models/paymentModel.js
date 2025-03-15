const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },  // Reference to the student making the payment

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },  // Reference to the course for which the payment is made

  amount: {
    type: Number,
    required: true
  },  // Amount paid

  paymentDate: {
    type: Date,
    default: Date.now
  },  // Date of payment

  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'Bank Transfer'],
    required: true
  },  // Method used for payment

  status: {
    type: String,
    enum: ['Completed', 'Pending', 'Failed'],
    default: 'Completed'
  }  // Status of the payment
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
