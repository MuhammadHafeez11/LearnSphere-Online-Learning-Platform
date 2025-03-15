const mongoose = require('mongoose');

const submittedContentSchema = new mongoose.Schema({
    contendModule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContentModule',
        required: true,
    },
    staffId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Staff', 
    required: true 
  },
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },  
  contentType: { 
    type: String, 
    required: [true, "Please provide a ContentType"],
    enum: ['Lecture', 'Quiz', 'Assignment'],
    default: 'Lecture'  // Default content type is Lecture if not provide
    },
  // content : [
  //   {  
  //     contentType: { 
  //     type: String, 
  //     required: [true, "Please provide a ContentType"],
  //     enum: ['Lecture', 'Quiz', 'Assignment'],
  //     default: 'Lecture'  // Default content type is Lecture if not provide
  //     },
  //     contentFile: {
  //       type: String,
  //       required: [true, "Please provide a Content File"]
  //     },
  // }
  // ],
  contentFile: {
    type: String,
    required: [true, "Please provide a Content File"]
  },
  totalMarks: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  assignedMarks: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }

}, {timestamps: true});

module.exports = mongoose.model('SubmittedContent', submittedContentSchema);
