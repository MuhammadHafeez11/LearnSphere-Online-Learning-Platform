const mongoose = require('mongoose');

const enrolledDataSchema = new mongoose.Schema({
  contentModuleId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ContentModule', 
    required: true 
  },
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },  
  startDate: { 
    type: String, 
    required: [true, "Please Enter Start Date"],
    },
  endDate: { 
    type: String, 
    required: [true, "Please Enter Start Date"],
    },
  price: { 
    type: Number, 
  },   

}, {timestamps: true});

module.exports = mongoose.model('EnrolledData', enrolledDataSchema);
