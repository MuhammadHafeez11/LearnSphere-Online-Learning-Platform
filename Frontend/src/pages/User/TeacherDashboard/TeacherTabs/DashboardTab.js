import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../../../actions/courseAction';
import CustomTable from '../../../../components/customComponents/customTable';
import './DashboardTab.css';

const DashboardTab = () => {
  const dispatch = useDispatch();

  // Retrieve and parse the user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user JSON
  const teacherId = user?._id; // Get teacherId from user object

  const { courses = [], loading, error } = useSelector((state) => state.courseData);

  // Dispatch getCourses on component mount
  useEffect(() => {
    if (teacherId) {
      dispatch(getCourses());
    }
  }, [dispatch, teacherId]);

  // Filter courses to only those offered by the current teacher
  const teacherCourses = courses?.filter(course => course.instructorId === teacherId) || [];

  // Calculate total students and total revenue for the teacher's courses
  const totalStudents = teacherCourses.reduce((acc, course) => acc + (course.students?.length || 0), 0);
  const totalRevenue = teacherCourses.reduce((acc, course) => {
    const studentsCount = course.students?.length || 0;
    return acc + (course.price * studentsCount);
  }, 0);

  // Helper function to check if a string is valid JSON
  const isValidJson = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Prepare student data for the table
  const studentData = teacherCourses.flatMap(course =>
    course.students.map(student => {
      // If the student is a string, try to parse it only if it's valid JSON
      let parsedStudent;
      if (typeof student === 'string' && isValidJson(student)) {
        parsedStudent = JSON.parse(student);
      } else if (typeof student === 'object') {
        parsedStudent = student;
      } else {
        console.warn('Invalid student data format:', student);
        return null; // Skip invalid student data
      }

      return {
        name: parsedStudent?.studentName || 'Unknown',
        course: course.title,
        email: parsedStudent?.studentEmail || 'No Email',
      };
    }).filter(Boolean) // Remove any null values from invalid data
  );

  const columns = [
    { header: 'Student Name', accessorKey: 'name' },
    { header: 'Course Name', accessorKey: 'course' },
    { header: 'Email', accessorKey: 'email' },
  ];

  return (
    <div className="dashboard-tab">
      <div className="dashboard-summary">
        <div className="dashboard-card">
          <h3>Total Students</h3>
          <p>{loading ? 'Loading...' : totalStudents}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <p>{loading ? 'Loading...' : `$${totalRevenue}`}</p>
        </div>
      </div>

      <div className="student-list">
        <h3>Student List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : studentData.length > 0 ? (
          <CustomTable columns={columns} data={studentData} />
        ) : (
          <p>No students enrolled yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardTab;
