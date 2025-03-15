const express = require("express");
const SingleUpload = require("../middlewares/multer.js");    
const { newStudentUser, loginStudent } = require("../controllers/student.js");
const app = express.Router();
// app.use()
// Create a new staff user with profile picture
app.post("/new", SingleUpload, newStudentUser);
app.post("/login", loginStudent);
module.exports = app;
