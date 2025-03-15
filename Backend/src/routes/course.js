const express = require("express"); 
const { getCourses, addNewCourse, getCourseDetailsByID, updateCourseByID } = require("../controllers/course");
const app = express.Router();

app.post('/add', addNewCourse);

// app.post("/new",  newCourse);
app.get("/get", getCourses);
app.get("/get/:id", getCourseDetailsByID);
app.put("/update/:id", updateCourseByID);



module.exports = app;
