const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },  // Reference to the student making the submission

  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },  // Reference to the module (Assignment/Quiz) being submitted

  contentType: {
    type: String,
    enum: ['Assignment', 'Quiz'],
    required: true
  },  // Indicates whether this submission is for an assignment or quiz

  submissionDate: {
    type: Date,
    default: Date.now,
    required: true
  },  // Timestamp of when the student submitted the work

  submittedFiles: [{
    fileUrl: { type: String },  // URLs to submitted files (for file-type assignments)
    fileType: { type: String }  // Type of file submitted (e.g., PDF, DOCX, etc.)
  }],  // Array to store multiple submitted files if needed

  textSubmission: { 
    type: String 
  },

  quizAnswers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
      required: true
    },  // Reference to the question in the quiz
    answer: { type: String, required: true }  // The student's answer to the question
  }],  // For quiz-type submissions, this will store the student's answers to each question

  graded: { 
    type: Boolean, 
    default: false 
  },  // Indicates whether the submission has been graded yet

  lateSubmission: { 
    type: Boolean, 
    default: false 
  },  // Marks whether the submission was submitted after the due date

  resubmissions: [{
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission'
    },  // Allows tracking resubmitted work by referencing previous submissions
    resubmittedAt: { 
      type: Date 
    }  // Timestamp for when the resubmission occurred
  }]
}, {
  timestamps: true 
});

module.exports = mongoose.model('Submission', submissionSchema);
