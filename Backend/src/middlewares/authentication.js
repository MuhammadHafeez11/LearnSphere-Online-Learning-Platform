const jwt = require("jsonwebtoken");
const Staff = require("../models/staffModel")
exports.isAuthenticatedUser = async(req, res, next)=>{
const  {token} = req.cookies;
try {
    if(!token){
        return res.status(401).json("Please login to acces this resource");
        }else{
              // Verify token
              const decodeData = jwt.verify(token, process.env.JWT_SECRET);
              req.user = await Staff.findById(decodeData.id);
              next(); // Continue if the token is valid
        }
    
      } catch (err) {
        // Catch token expiration or other errors and stop further processing
        return res.status(401).json("Token expired or invalid. Please log in again.");
      }
}