import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetails } from '../../../actions/courseAction'; 
import { useParams } from 'react-router-dom';
import Navbar from '../../Layout/Header/Navbar';
import { FaChalkboardTeacher, FaCalendarAlt, FaUserGraduate, FaLock, FaPlay } from 'react-icons/fa';
import './CourseDetails.css';

function CourseDetails() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  
  const { courseDetails, loading, error } = useSelector((state) => state.courseDetails);

  useEffect(() => {
    dispatch(getCourseDetails(id)); 
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <div className="course-details-container">
        {loading ? (
          <p>Loading course details...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="course-details-content">
            <div className="course-header">
              <h1>{courseDetails?.data.title}</h1>
              <h3>{courseDetails?.data.subtitle}</h3>
              <div className="header-para">
                <p><FaChalkboardTeacher className="icon" /> {courseDetails?.data.instructorName}</p>
                <p><FaCalendarAlt className="icon" /> {courseDetails?.data.date ? new Date(courseDetails.data.date).toLocaleDateString() : 'Date not available'}</p>
                <p><FaUserGraduate className="icon" /> {courseDetails?.data.students?.length} Students</p>
              </div>
            </div>

            <div className="course-content">
              <div className="course-left">
                <section className="course-box">
                  <h2>What you'll learn</h2>
                  <p>{courseDetails?.data.objectives}</p>
                </section>

                <section className="course-box">
                  <h2>Course Description</h2>
                  <p>{courseDetails?.data.description}</p>
                </section>

                <section className="course-box">
                  <h2>Course Curriculum</h2>
                  <ul>
                    {courseDetails?.data.curriculum?.map((lecture) => (
                      <li key={lecture._id} className="curriculum-item">
                        {lecture.freePreview ? <FaPlay className="icon" /> : <FaLock className="icon" />} 
                        <span className="lecture-title">{lecture.title}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="course-right">
                <video controls className="course-preview-video">
                  <source src={courseDetails?.data.curriculum[0]?.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="course-buy">
                  <h3>Price: ${courseDetails?.data.price}</h3>
                  <button className="buy-now-btn">Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
