const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema({
  title: String,
  videoUrl: String,
  public_id: String,
  freePreview: Boolean,
});

const CourseSchema = new mongoose.Schema({
  instructorId: String,
  instructorName: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  primaryLanguage: String,
  subtitle: String,
  description: String,
  image: String,
  welcomeMessage: String,
  price: Number,
  objectives: String,
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
      paidAmount: String,
    },
  ],
  curriculum: [LectureSchema],
  isPublised: Boolean,
});

module.exports = mongoose.model("Course", CourseSchema);


// const mongoose = require('mongoose');

// const courseSchema = new mongoose.Schema(
//   {
//     courseName: { 
//       type: String, 
//       required: [true, "Please Enter Title of Course"] 
//     }, 
//     description: { 
//       type: String, 
//       required: [true, "Please Enter Description of Course"] 
//     }, 
//     // overview: { 
//     //   type: String 
//     // },  
//     // level: { 
//     //   type: String, 
//     //   enum: ['Beginner', 'Intermediate', 'Advanced'],  
//     //   default: 'Beginner'
//     // },
//     // duration: { 
//     //   type: Number, 
//     //   required: [true, "Please Enter Duration of Course"] },  //in hours
//     // price: { 
//     //   type: Number, 
//     // },  
//     // currency: { 
//     //   type: String, 
//     //   default: 'USD' 
//     // }, 
//     enrollmentStartDate: { 
//       type: Date 
//     }, 
//     enrollmentEndDate: { 
//       type: Date 
//     },  
//     // startDate: { 
//     //   type: Date 
//     // },  
//     // endDate: { 
//     //   type: Date 
//     // },  
// }, 
// { 
//   timestamps: true 
// });

// module.exports = mongoose.model('Course', courseSchema);
