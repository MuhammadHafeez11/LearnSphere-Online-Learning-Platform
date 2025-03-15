const express = require("express");
const SingleUpload = require("../middlewares/multer.js");    
const { newUser, loginUser } = require("../controllers/user.js");
const app = express.Router();


app.post("/new", SingleUpload, newUser);
app.post("/login", loginUser);
module.exports = app;
