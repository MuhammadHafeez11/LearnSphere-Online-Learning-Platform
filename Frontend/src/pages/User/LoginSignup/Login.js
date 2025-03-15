import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors } from "../../../actions/errorAction"; // Import error actions
import { userLogin } from "../../../actions/userAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Destructure ser and error states
  const { success, message,  user, loading } = useSelector((state) => state.user);
  const { errorMessage } = useSelector((state) => state.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password)); // Dispatch login action
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(clearErrors()); // Clear error after displaying
    }
  
    if (success && user) { // Add check if `user` exists
      toast.success(message);
      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(user));
  
      // Redirect based on role, but first check if `user` and `user.role` are available
      if (user.role?.roleName === "Student") {
        navigate("/student/dashboard"); // Redirect student to dashboard
      } else if (user.role?.roleName === "Staff") {
        navigate("/teacher/dashboard"); // Redirect teacher to dashboard
      }
      
      localStorage.setItem("role", user.role?.roleName)
    }
  }, [errorMessage, success, user, message, navigate, dispatch]);
  

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Sign in to continue to Title</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="Email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
              placeholder="Enter your Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="signup-prompt">
          Don't have an account?{" "}
          <Link to="/user/signup" className="signup-text">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
