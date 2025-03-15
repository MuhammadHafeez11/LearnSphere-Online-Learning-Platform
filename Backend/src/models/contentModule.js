const mongoose = require('mongoose');

const contentModuleSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },  // Title of the module
  description: { 
    type: String 
  },  // Description of the module
  staffId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Staff', 
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
  duration: { 
    type: String, 
    required: [true, "Please Enter Duration of Course"] },  //in hours
  price: { 
    type: Number, 
  },    
  startDate: { 
    type: Date 
  },  
  endDate: { 
    type: Date 
  },

}, {timestamps: true});

module.exports = mongoose.model('ContentModule', contentModuleSchema);
