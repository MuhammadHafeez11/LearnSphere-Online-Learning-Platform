const express = require("express"); 
const { newTask, getTasks } = require("../controllers/task");
const app = express.Router();


app.post("/new",  newTask);
app.get("/get", getTasks);
module.exports = app;
