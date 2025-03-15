const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: [true, "Please enter a Course Id"] 
  },  // Reference to the course being reviewed
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: [true, "Please enter a Student Id"] 
  },  
  rating: { 
    type: Number, 
    min: 1, 
    max: 5  // Rating value between 1 and 5
  },
  feedback: { 
    type: String  
  },
}, 
{
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
