import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import './SignUp.css';
import { studentRegister } from '../../../actions/studentAction';
import { clearErrors } from '../../../actions/errorAction';

function StudentSignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { studentLoading, success, message } = useSelector(state => state.student);
    const  {role}  = useSelector(state => state.role);
    const { errorMessage } = useSelector(state => state.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [photo, setPhoto] = useState(null);
    const [gender, setGender] = useState('');
    const [studentId, setStudentId] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

    
        const formData = new FormData();
        formData.append('name', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('photo', photo);
        formData.append('gender', gender);
        formData.append('role', role.data._id);
        formData.append('studentId', studentId);
        formData.append('dob', dob);
        formData.append('address', address);

        dispatch(studentRegister(formData));
    };

    useEffect(() => {
      if (errorMessage) {
          toast.error(errorMessage);
          dispatch(clearErrors());
      }

      if (success) {
          toast.success(message);
          navigate('/student/dashboard');
      }
      
  }, [ success, message]);


  
  return (
    <div className="signupContainer">
      <div className="signupBox">
        <h2 className="signupHeading">Sign Up as Student</h2>
        <form onSubmit={handleSubmit} className="signupForm">
          <div className="formRow">
            <div className="formGroup">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div className="formGroup">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="formRow">
            <div className="formGroup">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="formGroup">
              <input
                className='file-input'
                type="file"
                onChange={handlePhotoChange}
                required
              />
            </div>
          </div>
          <div className="formRow">
            <div className="formGroup">
              <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="formGroup">
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student Id"
                required
              />
            </div>
          </div>
          <div className="formRow">
            <div className="formGroup">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Date of Birth"
                required
              />
            </div>
            <div className="formGroup">
              <textarea
                className='text-area'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                required
              ></textarea>
            </div>
          </div>
          <button type="submit" className="signupBtn">Sign Up</button>
          <p className="signupPrompt">
            Already have an account? <Link to="/login" className="signupText">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default StudentSignUp;
