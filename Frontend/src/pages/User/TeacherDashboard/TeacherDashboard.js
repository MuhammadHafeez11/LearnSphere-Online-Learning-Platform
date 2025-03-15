import React, { useState, useEffect } from 'react';
import { FaChalkboardTeacher, FaBook, FaClipboard, FaUserGraduate, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux'; // Import dispatch
import { useNavigate } from 'react-router-dom'; 
import { userLogout } from '../../../actions/userAction.js';
import './TeacherDashboard.css';
import DashboardTab from './TeacherTabs/DashboardTab';
import MyCoursesTab from './TeacherTabs/MyCourseTab/MyCoursesTab.js';

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    // Get user from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name); // Assuming 'name' field contains the user's name
    } else {
      navigate('/login'); // Redirect to login if user not found
    }
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(userLogout());
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="teacher-dashboard">
      <nav className="teacher-sidebar">
        <ul>
          <li
            className={activeTab === 'Dashboard' ? 'active' : ''}
            onClick={() => handleTabClick('Dashboard')}
          >
            <FaChalkboardTeacher /> Dashboard
          </li>
          <li
            className={activeTab === 'My Courses' ? 'active' : ''}
            onClick={() => handleTabClick('My Courses')}
          >
            <FaBook /> My Courses
          </li>
          <li
            className={activeTab === 'Assignments' ? 'active' : ''}
            onClick={() => handleTabClick('Assignments')}
          >
            <FaClipboard /> Assignments
          </li>
          <li
            className={activeTab === 'Grades' ? 'active' : ''}
            onClick={() => handleTabClick('Grades')}
          >
            <FaUserGraduate /> Grades
          </li>
          <li
            className={activeTab === 'Messages' ? 'active' : ''}
            onClick={() => handleTabClick('Messages')}
          >
            <FaEnvelope /> Messages
          </li>
          <li onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </nav>

      <div className="teacher-content">
        <header className="teacher-header">
          <h2>Welcome, {userName}!</h2> {/* Display user's name */}
        </header>
        <div className="teacher-main">
          {activeTab === 'Dashboard' && (
            <section className="teacher-overview">
              <DashboardTab />
            </section>
          )}

          {activeTab === 'My Courses' && (
            <section className="teacher-courses">
              <MyCoursesTab />
            </section>
          )}

          {activeTab === 'Assignments' && (
            <section className="teacher-assignments">
              <h3>Your Assignments</h3>
              <p>Manage your assignments here...</p>
            </section>
          )}

          {activeTab === 'Grades' && (
            <section className="teacher-grades">
              <h3>Your Grades</h3>
              <p>Manage and review grades here...</p>
            </section>
          )}

          {activeTab === 'Messages' && (
            <section className="teacher-messages">
              <h3>Your Messages</h3>
              <p>Check and manage your messages here...</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
