const ErrorHandler = require('../Utils/utility-Class.js')
const { TryCatch } = require('../middlewares/error.js')
const bcrypt = require("bcrypt");
const  { rm } = require("fs");
const sendToken = require('../Utils/jwtToken.js');
const roleModel = require('../models/roleModel.js');

exports.newRole = TryCatch(async (req, res, next) => {
    console.log("fejil");
    const { roleName, roleDescription, priority } = req.body;

    if(!roleName || !roleDescription || !priority)
    {
        return next(new ErrorHandler('Please provide all Fields', 400));
    }

    const newRole = new roleModel({
        roleName,
        roleDescription,
        priority
    });

    await newRole.save();
    res.status(201).json({
        success: true,
        data: newRole
    });
  
});

exports.getRole = TryCatch(async (req, res, next) => {
    
    const roleData = await roleModel.find()

    if(!roleData)
    {
        return next(new ErrorHandler('No Record Found', 400));
    }

    res.status(201).json({
        success: true,
        data: roleData
    });
  
});

exports.getRolesOnName = TryCatch(async (req, res, next) => {
    
    const roleData = await roleModel.findOne({roleName: req.params.roleName})

    if(!roleData)
    {
        return next(new ErrorHandler('No Record Found', 400));
    }

    res.status(201).json({
        success: true,
        data: roleData
    });
  
});