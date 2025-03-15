const ErrorHandler = require("../Utils/utility-Class");
const {rm} = require("fs");
exports.errorMiddleware = (err, req, res, next) => {
    err.message || (err.message = "Internal Server Error");
    err.statusCode || (err.statusCode = 500);
    if (err.name === "CastError")
        err.message = "Invalid Id";
    if (err.code === 11000) {
        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
        const photo = req.file;
        console.log(photo?.path)
        if (photo)
            rm(photo.path, () => {
                console.log("Photo Deleted");
            });
        err = new ErrorHandler(message, 400);
      }
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
exports.TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
