const express = require('express')
const {config}  = require('dotenv');
const cors = require('cors');
const cookieParse = require("cookie-parser");
const connectDB = require('./src/Utils/features')
const staffRoute = require("./src/routes/staff");
const studentRoute = require("./src/routes/student");
const userRoute = require("./src/routes/user");
const roleRoute = require("./src/routes/role");
const taskRoute = require("./src/routes/task");
const courseRoute = require("./src/routes/course");
const MediaRoute = require('./src/routes/media-route')
const contentRoute = require("./src/routes/contentModule");
const enrolledDataRoute = require("./src/routes/enrolledData");
const { errorMiddleware } = require('./src/middlewares/error');
config({
    path: "./.env"
});
const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
connectDB(mongoURI);

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your client URL
    credentials: true // Allow credentials
}));

app.use(express.json());
app.use(cookieParse());
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/Staff", staffRoute);
app.use("/api/v1/Media", MediaRoute);
app.use("/api/v1/Student", studentRoute);
app.use("/api/v1/User", userRoute);
app.use("/api/v1/Task", taskRoute);
app.use("/api/v1/Course", courseRoute);
app.use("/api/v1/cententModule", contentRoute);
app.use("/api/v1/enrolledData", enrolledDataRoute);

// For Images acess
app.use("/uploads", express.static('uploads'))
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`express is workingon http://localhost:${port}`);
});
