
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Please provide a staff User name"], 
    trim: true 
  },  // Full name of the user
  email: { 
    type: String,
    unique: [true, "Email Already Exist"],
    required: [true, "Please enter Email"],
    validate: validator.default.isEmail
  },  // Unique email address for each user
  password: { 
    type: String, 
    required: true 
  },  // Hashed password for authentication
  role: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Role' 
  },  // Reference to the Role schema (Admin, Teacher, Super Admin)
    photo: {      
    type: String,
    required: [true, "Please enter Photo"]
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Others'] 
  },  
  phoneNumber: { 
    type: String 
  },  
  dob: { 
    type: Date 
  }, 
  address: { type: String },
  studentId: 
  { type: String, 
    unique: true 
  },  
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, 

{ 
  timestamps: true 
});

studentSchema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();
  if (today.getMonth() < dob.getMonth() || today.getMonth() === dob.getMonth()
      && today.getDate() < dob.getDate()) {
      age--;
  }
  return age;
});



studentSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

///*** compare Password
studentSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(enteredPassword);
  console.log(this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

//// Generating Password Reset Token
studentSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and Adding to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};


module.exports = mongoose.model('Students', studentSchema);

  // name: { type: String, required: true, trim: true }, 
  // studentID: { type: String, unique: true},
  // email: { type: String, required: true, unique: true, trim: true }, 
  // password: { type: String, required: true },  
  // role: { type: String, default: 'Student' },  

  // profilePicture: { type: String }, 
  // gender: { type: String, enum: ['Male', 'Female', 'Other'] },  
  // dateOfBirth: { type: Date }, 
  // phoneNumber: { type: String }, 
  // address: {
  //   street: { type: String },
  //   city: { type: String },
  //   state: { type: String },
  //   postalCode: { type: String },
  //   country: { type: String },
  // },  

  // previousEducation: {
  //   institution: { type: String },  
  //   degree: { type: String },  
  //   yearOfPassing: { type: Number }, 
  // }, 

  // accountStatus: {
  //   type: String,
  //   enum: ['Active', 'Suspended', 'Deactivated'],
  //   default: 'Active',
  // },  

  // languages: [{ type: String }],  
  // interests: [{ type: String }],  
  // skills: [{ type: String }], 



