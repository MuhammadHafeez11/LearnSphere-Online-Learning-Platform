const   Staff = require('../models/staffModel.js')
const ErrorHandler = require('../Utils/utility-Class.js')
const { TryCatch } = require('../middlewares/error.js')
const bcrypt = require("bcrypt");
const  { rm } = require("fs");
const sendToken = require('../Utils/jwtToken.js');

exports.newStaffUser = TryCatch(async (req, res, next) => {
    console.log("fejil");
    const { name, email, password, role, address, employeeId, gender, dob } = req.body;
    const photo = req.file;
    const relativePath = photo?.path.substring(photo?.path.indexOf("uploads\\"));
    if (!photo)
        return next(new ErrorHandler('Please Add Photo', 400));

    const hashedPwd = await bcrypt.hash(password, 10);
    
    if (!name || !email || !password || !role || !address || !employeeId || !gender || !dob)
    {
        rm(relativePath, () => {
            console.log("Photo Deleted");
        });
        return next(new ErrorHandler('Please provide all Fields', 400));
    }
      
    user = await Staff.create({  
        name, 
        email, 
        password: hashedPwd, 
        role, 
        address, 
        employeeId, 
        gender, 
        dob,
        photo: relativePath});
    return res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`,
        user,
    });
});


exports.loginStaff = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler('Please provide username or password', 400));
    }

    console.log("called");

    // const foundUser = await User.findOne({ username }).select("+password").populate("shopNo");
    const foundUser = await Staff.findOne({ email })
      .select("+password")
      .populate("role")
      .exec();

    if(foundUser?.role?.roleName !== "Staff"){  
        return next(new ErrorHandler('You are not allowed to login', 401));
    }


    if (!foundUser) {
      return next(new ErrorHandler('Invalid Credentials', 401));
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Credentials', 401));

    } 
    else {
      sendToken(foundUser, 201, res);
    }
});
