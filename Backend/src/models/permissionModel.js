const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  permissionName: { type: String, required: true},  // Name of the permission (e.g., manage_users, view_reports)
  description: { type: String },  // Brief description of what the permission allows
}, { timestamps:true});

const Permission = mongoose.model('Permission', permissionSchema);
module.exports = Permission;
