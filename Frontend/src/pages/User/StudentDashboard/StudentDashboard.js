import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../../actions/courseAction'; 
import Navbar from '../../Layout/Header/Navbar';
import './StudentDashboard.css';

function StudentDashboard() {
  const dispatch = useDispatch();
  const { courses = [], loading, error } = useSelector((state) => state.courseData);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [levelFilter, setLevelFilter] = useState([]);
  const [sortOrder, setSortOrder] = useState('title-asc');

  const categories = [...new Set(courses.map(course => course.category))]; 
  const levels = [...new Set(courses.map(course => course.level))];

  const handleCategoryChange = (category) => {
    setCategoryFilter((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category]
    );
  };

  const handleLevelChange = (level) => {
    setLevelFilter((prev) =>
      prev.includes(level) ? prev.filter((lev) => lev !== level) : [...prev, level]
    );
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortCourses = (courses) => {
    if (sortOrder === 'title-asc') {
      return [...courses].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'title-desc') {
      return [...courses].sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === 'price-asc') {
      return [...courses].sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      return [...courses].sort((a, b) => b.price - a.price);
    }
    return courses;
  };

  const filteredCourses = sortCourses(
    courses.filter(
      (course) =>
        (categoryFilter.length === 0 || categoryFilter.includes(course.category)) &&
        (levelFilter.length === 0 || levelFilter.includes(course.level))
    )
  );

  return (
    <Fragment>
      <Navbar />
      <div className="student-dashboard">
        <div className="student-sidebar">
          <div className="filter-section">
            <h3>Filter by Category</h3>
            {categories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  value={category}
                  onChange={() => handleCategoryChange(category)}
                  checked={categoryFilter.includes(category)}
                />
                {category}
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h3>Filter by Level</h3>
            {levels.map((level) => (
              <label key={level}>
                <input
                  type="checkbox"
                  value={level}
                  onChange={() => handleLevelChange(level)}
                  checked={levelFilter.includes(level)}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <div className="student-content">
          <header className="student-header">
            <h2>Welcome, {user ? user.name : 'Student'}!</h2>
            <p>Browse and filter courses below.</p>
          </header>

          <div className="student-controls">
            <h4>Total Results: {filteredCourses.length}</h4>
            <div className="sort-section">
              <label htmlFor="sort">Sort By: </label>
              <select id="sort" value={sortOrder} onChange={handleSortChange}>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
              </select>
            </div>
          </div>

          <div className="course-grid">
            {loading ? (
              <p>Loading courses...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              filteredCourses.map((course) => (
                <Link to={`/course/follow/${course._id}`} key={course._id} className="course-card-link">
                  <div className="course-card">
                    <img src={course.image} alt={course.title} className="course-image" />
                    <h3>{course.title}</h3>
                    <p>Category: {course.category}</p>
                    <p>Level: {course.level}</p>
                    <p className="course-price">Price: ${course.price}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default StudentDashboard;
