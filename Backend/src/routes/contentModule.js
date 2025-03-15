const express = require("express"); 
const { getContentModule, newContentModule } = require("../controllers/contentModule");
const app = express.Router();


app.post("/new",  newContentModule);
app.get("/get", getContentModule);
module.exports = app;
