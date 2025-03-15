const ErrorHandler = require('../Utils/utility-Class.js')
const { TryCatch } = require('../middlewares/error.js');
const courseModel = require('../models/courseModel.js');

const addNewCourse = async (req, res) => {
    try {
      const courseData = req.body;
      const newlyCreatedCourse = new courseModel(courseData);
      const saveCourse = await newlyCreatedCourse.save();
  
      if (saveCourse) {
        res.status(201).json({
          success: true,
          message: "Course saved successfully",
          data: saveCourse,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  };

  
// exports.newCourse = TryCatch(async (req, res, next) => {
//     console.log("fejil");
//     const { courseName, description, enrollmentStartDate,enrollmentEndDate } = req.body;

//     if(!courseName || !description || !enrollmentStartDate || !enrollmentEndDate)
//     {
//         return next(new ErrorHandler('Please provide all Fields', 400));
//     }

//     const newCourse = new courseModel({
//         courseName,
//         description,
//         enrollmentStartDate,
//         enrollmentEndDate
//     });

//     await newCourse.save();
//     res.status(201).json({
//         success: true,
//         data: newCourse
//     });
  
// });

const getCourses = TryCatch(async (req, res, next) => {
    
    const courseData = await courseModel.find()

    if(!courseData)
    {
        return next(new ErrorHandler('No Record Found', 400));
    }

    res.status(201).json({
        success: true,
        data: courseData
    });
  
});


const getCourseDetailsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const courseDetails = await courseModel.findById(id);

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: courseDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const updateCourseByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourseData = req.body;

    const updatedCourse = await courseModel.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
    addNewCourse,
    getCourses,
    updateCourseByID,
     getCourseDetailsByID,
} 