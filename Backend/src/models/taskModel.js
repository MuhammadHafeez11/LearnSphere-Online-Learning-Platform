const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: { 
    type: String, 
    required: true,  
    unique: true,
  }, 
  taskDescription: {
    type: String,
    required: true,  
  },
  priority: {
    type: Number,
    required: true,
  }
}, {timestamps:true});

module.exports = mongoose.model('Task', taskSchema);
