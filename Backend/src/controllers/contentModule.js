
const ErrorHandler = require('../Utils/utility-Class.js')
const { TryCatch } = require('../middlewares/error.js')
const bcrypt = require("bcrypt");
const  { rm } = require("fs");
const sendToken = require('../Utils/jwtToken.js');
const contentModule = require('../models/contentModule.js');

exports.newContentModule = TryCatch(async (req, res, next) => {
    const { title, description, staffId, course, contentType,  duration, price, startDate, endDate } = req.body;
    const photo = req.file;
    const relativePath = photo?.path.substring(photo?.path.indexOf("uploads\\"));
    if (!photo)
        return next(new ErrorHandler('Please Add Content', 400));
    
    if (!title || !description || staffId || !course || !contentType ||  !duration || !price || !startDate || !endDate)
    {
        rm(relativePath, () => {
            console.log("Photo Deleted");
        });
        return next(new ErrorHandler('Please provide all Fields', 400));
    }
      
    user = await contentModule.create({  
        title, 
        description, 
        staffId, 
        course, 
        contentType,  
        duration, 
        price, 
        startDate, 
        endDate,
        contentFile: relativePath});
    return res.status(201).json({
        success: true,
        message: `Content Created successfully`
    });
});

exports.getContentModule = TryCatch(async (req, res, next) => {
    
    const contentData = await contentModule.find()

    if(!contentData)
    {
        return next(new ErrorHandler('No Record Found', 400));
    }

    res.status(201).json({
        success: true,
        data: contentData
    });
  
});