const mongoose = require("mongoose");
// require("dotenv").config();

const connectDB = (uri) => {
    console.log('hafei');
    console.log(uri)
    mongoose.connect(uri, {
        dbName: "Online_Course_Management"
    }).then(c => console.log(`DB Connected To ${c.connection.host}`)).
        catch((e) => console.log(e));
};
module.exports = connectDB;