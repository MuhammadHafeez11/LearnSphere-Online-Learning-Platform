const express = require("express"); 
const { newEnrolledData, getEnrolledData } = require("../controllers/enrolledData");
const app = express.Router();


app.post("/new",  newEnrolledData);
app.get("/get", getEnrolledData);
module.exports = app;
