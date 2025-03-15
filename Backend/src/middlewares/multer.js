const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const uploadDir = path.join(__dirname, "../uploads");
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, uploadDir);
    },
    filename(req, file, callback) {
        const id = uuidv4()
        const extName = file.originalname.split(".").pop();
        const fileName = `${id}.${extName}`;

        callback(null, fileName);
    }
});
const SingleUpload = multer({ storage }).single("photo");
module.exports =  SingleUpload
