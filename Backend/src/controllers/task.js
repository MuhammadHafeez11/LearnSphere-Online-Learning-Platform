const ErrorHandler = require('../Utils/utility-Class.js')
const { TryCatch } = require('../middlewares/error.js');
const taskModel = require('../models/taskModel.js');

exports.newTask = TryCatch(async (req, res, next) => {
    console.log("fejil");
    const { taskName, taskDescription, priority } = req.body;

    if(!taskName || !taskDescription || !priority)
    {
        return next(new ErrorHandler('Please provide all Fields', 400));
    }

    const newTask = new taskModel({
        taskName,
        taskDescription,
        priority
    });

    await newTask.save();
    res.status(201).json({
        success: true,
        data: newTask
    });
  
});

exports.getTasks = TryCatch(async (req, res, next) => {
    
    const taskData = await taskModel.find()

    if(!taskData)
    {
        return next(new ErrorHandler('No Record Found', 400));
    }

    res.status(201).json({
        success: true,
        data: taskData
    });
  
});
