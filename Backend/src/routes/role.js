const express = require("express"); 
const { newRole, getRole, getRolesOnName } = require("../controllers/role.js");
const app = express.Router();


app.post("/new",  newRole);
app.get("/get", getRole);
app.get("/:roleName", getRolesOnName)
module.exports = app;
