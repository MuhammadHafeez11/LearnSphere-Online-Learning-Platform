
const ErrorHandler = require('../Utils/utility-Class.js')
const { TryCatch } = require('../middlewares/error.js')
const contentModule = require('../models/contentModule.js');
const enrolledDataModel = require('../models/enrolledData.js');

exports.newEnrolledData = TryCatch(async (req, res, next) => {
    const { contentModuleId, student, startDate, endDate, price,   } = req.body;
    
    if (!contentModuleId|| !student || !startDate || !endDate || !price)
    {
        return next(new ErrorHandler('Please provide all Fields', 400));
    }
      
    user = await enrolledDataModel.create({  
        contentModuleId, 
        student, 
        startDate, 
        endDate, 
        price 
    });
    return res.status(201).json({
        success: true,
        message: `Enrolled Data Created successfully`
    });
});

exports.getEnrolledData = TryCatch(async (req, res, next) => {
    
    const enrolledData = await enrolledDataModel.find()

    if(!enrolledData)
    {
        return next(new ErrorHandler('No Record Found', 400));
    }

    res.status(201).json({
        success: true,
        data: enrolledData
    });
  
});
