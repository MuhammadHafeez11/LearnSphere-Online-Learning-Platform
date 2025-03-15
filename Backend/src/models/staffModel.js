const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const staffSchema = new mongoose.Schema({
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
   
  // organization: [
  //   { type: mongoose.Schema.Types.ObjectId, 
  //     ref: 'Organization' 
  //   }
  // ], 
  employeeId: 
  { type: String, 
    unique: true 
  },  
  // hireDate: { type: Date, default: Date.now },  
  // position: { type: String },  
  // salary: { type: Number },  
  // employmentType: { type: String, enum: ['Full-Time', 'Part-Time', 'Contract'], default: 'Full-Time' },
  
  // accountStatus: {
  //   type: String,
  //   enum: ['Active', 'Suspended', 'Deactivated'],
  //   default: 'Active',
  // },  
  // lastLogin: { type: Date },  
  // createdAt: { type: Date, default: Date.now },
  
  // bio: { type: String }, 
  // expertise: [{ type: String }], 
  // certifications: [{ name: { type: String }, institution: { type: String }, dateObtained: { type: Date } }],  
  // languages: [{ type: String }], 
  // emergencyContact: {
  //   name: { type: String },
  //   relationship: { type: String },
  //   phoneNumber: { type: String },
  //   email: { type: String },
  // },  

  // socialLinks: {
  //   linkedIn: { type: String },
  //   twitter: { type: String },
  //   facebook: { type: String },
  // }, 
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, 

{ 
  timestamps: true 
});

staffSchema.virtual("age").get(function () {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();
  if (today.getMonth() < dob.getMonth() || today.getMonth() === dob.getMonth()
      && today.getDate() < dob.getDate()) {
      age--;
  }
  return age;
});
// Pre-save hook to generate student ID
// staffSchema.pre('save', async function (next) {
//     if (!this.employeeId) {
//       // Generate a unique student ID (e.g., "STU" + random number)
//       const randomID = 'EMP' + Math.floor(1000 + Math.random() * 9000);  // Generates STUxxxx
//       const existingStaff = await this.constructor.findOne({ employeeId: randomID });
      
//       // Ensure ID is unique
//       if (!existingStaff) {
//         this.employeeId = randomID;
//       } else {
//         next(new Error('Error generating unique staffId, please try again.'));
//       }
//     }
//     next();
//   });



staffSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

///*** compare Password
staffSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(enteredPassword);
  console.log(this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

//// Generating Password Reset Token
staffSchema.methods.getResetPasswordToken = function () {
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


module.exports = mongoose.model('Staff', staffSchema);
