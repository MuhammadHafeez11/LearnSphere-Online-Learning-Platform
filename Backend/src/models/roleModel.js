const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: { 
    type: String, 
    required: true,  
    unique: true,
  }, 
  roleDescription: {
    type: String,
    required: true,  
  },
  priority: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  }
}, {timestamps:true});

module.exports = mongoose.model('Role', roleSchema);
