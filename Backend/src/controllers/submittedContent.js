
const ErrorHandler = require('../Utils/utility-Class.js')
const { TryCatch } = require('../middlewares/error.js')
const bcrypt = require("bcrypt");
const  { rm } = require("fs");
const sendToken = require('../Utils/jwtToken.js');
const contentModule = require('../models/contentModule.js');
const submittedContent = require('../models/submittedContent.js');

exports.newSubmittedContent = TryCatch(async (req, res, next) => {
    const { contendModule, staffId, studentId, course, contentType,  totalMarks, assignedMarks, percentage } = req.body;
    const photo = req.file;
    const relativePath = photo?.path.substring(photo?.path.indexOf("uploads\\"));
    if (!photo)
        return next(new ErrorHandler('Please Add Content', 400));
    
    if (!contendModule || !staffId || studentId || !course || !contentType || !totalMarks || !assignedMarks || !percentage)
    {
        rm(relativePath, () => {
            console.log("Photo Deleted");
        });
        return next(new ErrorHandler('Please provide all Fields', 400));
    }
      
    user = await submittedContent.create({  
        contendModule, 
        studentId, 
        staffId, 
        course, 
        contentType,  
        totalMarks, 
        assignedMarks, 
        percentage, 
        contentFile: relativePath});
    return res.status(201).json({
        success: true,
        message: `Submit successfully`
    });
});

exports.getSubmittedContent = TryCatch(async (req, res, next) => {
    
    const submittedData = await submittedContent.find()

    if(!submittedData)
    {
        return next(new ErrorHandler('No Record Found', 400));
    }

    res.status(201).json({
        success: true,
        data: submittedData
    });
  
});