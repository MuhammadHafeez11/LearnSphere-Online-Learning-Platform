const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },  // Reference to the student

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },  // Reference to the course the student is enrolled in

  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },  // Reference to the module the progress is being tracked for

  contentType: {
    type: String,
    enum: ['Lecture', 'Quiz', 'Assignment'],
    required: true
  },  // Type of content (Lecture, Quiz, Assignment)

  progressDetails: {
    lecture: {
      watchedDuration: { type: Number },  // Duration watched in minutes for lectures
      isCompleted: { type: Boolean, default: false }  // Whether the lecture is fully watched
    },

    quiz: {
      score: { type: Number },  // Score achieved on the quiz
      totalPoints: { type: Number },  // Total points possible for the quiz
      attempts: { type: Number, default: 1 },  // Number of attempts made on the quiz
      isCompleted: { type: Boolean, default: false }  // Whether the quiz is completed
    },

    assignment: {
      submitted: { type: Boolean, default: false },  // Whether the assignment was submitted
      submissionDate: { type: Date },  // Date of submission
      score: { type: Number },  // Score achieved on the assignment
      maxScore: { type: Number },  // Maximum score for the assignment
      isGraded: { type: Boolean, default: false },  // Whether the assignment is graded
    }
  },

  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }  // When the progress was last updated
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
