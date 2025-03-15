import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../../../../components/customComponents/customTable';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { getCourses } from '../../../../../actions/courseAction'; // Adjust the path based on your folder structure
import './MyCoursesTab.css';
import { toast } from 'react-toastify';

const MyCoursesTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve and parse the user data from localStorage
  const user = JSON.parse(localStorage.getItem("user")); // Parse the user JSON
  const teacherId = user?._id; // Get teacherId from user object

  // Retrieve courses from Redux store
  const { courses = [], loading, error } = useSelector((state) => state.courseData);

  useEffect(() => {
    if (teacherId) {
      dispatch(getCourses());
    }
  }, [dispatch, teacherId]);

  // Filter courses for the current teacher
  const myCourses = courses.filter(course => course.instructorId === teacherId);

  // Prepare data for the table
  const data = myCourses.map(course => ({
    id: course._id, // Use the course ID
    courseName: course.title,
    totalStudents: course.students.length,
    revenue: `$${course.price * course.students.length}`,
  }));

  const columns = [
    { header: 'Course Name', accessorKey: 'courseName' },
    { header: 'Total Students', accessorKey: 'totalStudents' },
    { header: 'Revenue', accessorKey: 'revenue' },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="actions">
          <FaEdit
            className="edit-icon"
            onClick={() => navigate(`/teacher/edit-course/${row.original.id}`)}
          />
          <FaTrashAlt className="delete-icon" onClick={() => handleDelete(row.original.id)} />
        </div>
      ),
    },
  ];

  const handleDelete = (courseId) => {
    // Handle delete logic here
    toast.success(`Delete course with ID: ${courseId}`);
  };

  return (
    <div className="my-courses-tab">
      <div className="header">
        <h2>All Courses</h2>
        <button className="create-course-btn" onClick={() => navigate('/teacher/new-course')}>
          Create New Course
        </button>
      </div>

      {loading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <CustomTable columns={columns} data={data} />
      )}
    </div>
  );
};

export default MyCoursesTab;
