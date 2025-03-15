const express = require("express");
const { newStaffUser, loginStaff } = require("../controllers/staff");
const SingleUpload = require("../middlewares/multer.js");    
const app = express.Router();
// app.use()
// Create a new staff user with profile picture
app.post("/new", SingleUpload, newStaffUser);
app.post("/login", loginStaff);
module.exports = app;
