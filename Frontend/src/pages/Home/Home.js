import React, { Fragment } from 'react';
import './Home.css';
import Navbar from '../../pages/Layout/Header/Navbar'

const Home = () => {
  return (
    <Fragment>
      <Navbar />
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Empower Your Learning Journey</h1>
          <p>Discover top-notch courses from industry experts, designed to help you master new skills at your own pace. Whether you're looking to upskill, change careers, or just explore new interests, we’ve got the course for you.</p>
          <div className="hero-buttons">
            <button className="primary-btn">Get Started Today</button>
            <button className="secondary-btn">Browse Our Courses</button>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="popular-courses">
        <h2>Top Courses to Enhance Your Skills</h2>
        <p>Our platform offers a diverse range of courses in tech, business, design, and much more. Explore some of the best:</p>
        <div className="courses-grid">
          <div className="course-card">
            <img src="https://www.shutterstock.com/image-photo/training-courses-business-concept-stack-260nw-549736798.jpg" alt="Course 1" />
            <h3>Mastering Web Development</h3>
            <p>Learn the full-stack development process, from HTML and CSS to advanced JavaScript frameworks.</p>
          </div>
          <div className="course-card">
            <img src="https://www.shutterstock.com/image-photo/training-courses-business-concept-stack-260nw-549736798.jpg" alt="Course 2" />
            <h3>Data Science Essentials</h3>
            <p>Unlock the power of data with this comprehensive course covering Python, statistics, and machine learning.</p>
          </div>
          <div className="course-card">
            <img src="https://www.shutterstock.com/image-photo/training-courses-business-concept-stack-260nw-549736798.jpg" alt="Course 3" />
            <h3>UI/UX Design for Beginners</h3>
            <p>Design beautiful and user-friendly interfaces that offer an exceptional experience for users.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Students Are Saying</h2>
        <p>Hear from students who have transformed their careers through our courses:</p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"This platform is fantastic! I went from knowing nothing about web development to building my own apps in just a few months."</p>
            <h4>- Alex M., Full-Stack Developer</h4>
          </div>
          <div className="testimonial-card">
            <p>"The courses are well-structured and the instructors are extremely helpful. I feel much more confident in my data skills."</p>
            <h4>- Sarah T., Data Analyst</h4>
          </div>
          <div className="testimonial-card">
            <p>"I took the UX design course, and it completely changed my career trajectory. I highly recommend it to anyone looking to break into tech!"</p>
            <h4>- Michael S., UX Designer</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 [Title]. Empowering lifelong learning.</p>
        <div className="footer-links">
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">About Us</a>
        </div>
      </footer>
    </div>
    </Fragment>
  );
};

export default Home;
