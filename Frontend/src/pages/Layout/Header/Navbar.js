import React, { Fragment } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRoleIdByName } from '../../../actions/roleAction'; // Import role action
import { userLogout } from '../../../actions/userAction'; // Import logout action

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
    // Get user from local storage
    const user = JSON.parse(localStorage.getItem('user'))

  const handleTeachOnTitleClick = async () => {
    await dispatch(getRoleIdByName('Staff'));
    navigate(`/signup`);
  };

  const handleSignUpClick = async () => {
    await dispatch(getRoleIdByName('Student'));
    navigate(`/signup`);
  };

  const handleLogout = () => {
    dispatch(userLogout());
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <Fragment>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/" className="logo-link">
            <img src={'/favicon.ico'} alt="Logo" className="logo-image" />
            <span className="logo-text"><i>Title</i></span>
          </Link>
        </div>

        <ul className="navbar-user-actions">
          {user ? (
            <>
              <li className="nav-link">
                <button onClick={handleLogout} className="nav-button">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-link">
                <button onClick={handleTeachOnTitleClick} className="nav-button">
                  Teach on Title
                </button>
              </li>
              <li className="user-login">
                <Link to="/login" className="nav-link">
                  Log in
                </Link>
              </li>
              <li>
                <button onClick={handleSignUpClick} className="nav-button">
                  Sign up
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navbar;
