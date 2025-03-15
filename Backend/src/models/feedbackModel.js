const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: [true, "Please enter Teacher Id"]
  },  
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: [true, "Please enter Submission ID"]
  },  // Reference to the student's submission (assignment or quiz) for which feedback is being provided

  feedbackText: {
    type: String,
    required: [true, "Please enter feedback text"]
  },  // Detailed feedback from the teacher

  score: {
    type: Number,
    min: 0,
    max: 100,
    required: [true, "Please enter obtained score"]
  },  // Numeric score/grade given for the submission

  feedbackDate: {
    type: Date,
    default: Date.now,
    // required: true
  },  // Timestamp of when the feedback was provided

  // additionalFiles: [{
  //   fileUrl: { type: String },  // Optional: URL to any additional files (e.g., annotated documents) provided by the teacher
  //   fileType: { type: String }  // Type of file (e.g., PDF, DOCX)
  // }]  // Array to store additional files, such as feedback attachments

}, {
  timestamps: true  
});

module.exports = mongoose.model('Feedback', feedbackSchema);
