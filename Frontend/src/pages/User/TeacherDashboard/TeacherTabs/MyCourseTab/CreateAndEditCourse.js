import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewCourse, getCourseDetails, updateCourse } from '../../../../../actions/courseAction';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../../api/axiosInstance';
import { toast } from 'react-toastify';
import './CreateAndEditCourse.css'; // Updated CSS file for professional styling

const CreateCourse = () => {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [curriculum, setCurriculum] = useState([{ title: '', videoUrl: '', freePreview: false }]);
  const [courseInfo, setCourseInfo] = useState({
    title: '',
    category: '',
    level: 'Beginner',
    subtitle: '',
    description: '',
    price: '',
    objectives: '',
    welcomeMessage: '',
    image: ''
  });
  const [isPreviewSet, setIsPreviewSet] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [instructor, setInstructor] = useState({ instructorName: '', instructorId: '' });
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseDetails, loading , error } = useSelector((state) => state.courseDetails);
  const { success } = useSelector((state) => state.updateCourse);

  // Fetch logged-in instructor data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setInstructor({ instructorName: user.name, instructorId: user._id });
    }
  }, []);

  // Fetch course details if editing
  useEffect(() => {
    if (courseId) {
      dispatch(getCourseDetails(courseId));
    }
  }, [dispatch, courseId]);

  // Populate form with course data when editing
  useEffect(() => {
    if (courseDetails && courseId) {
      setCourseInfo({
        title: courseDetails.data.title,
        category: courseDetails.data.category,
        level: courseDetails.data.level,
        subtitle: courseDetails.data.subtitle,
        description: courseDetails.data.description,
        price: courseDetails.data.price,
        objectives: courseDetails.data.objectives,
        welcomeMessage: courseDetails.data.welcomeMessage,
        image: courseDetails.data.image
      });
  
      // Ensure curriculum is defined and is an array before setting the state
      if (Array.isArray(courseDetails.data.curriculum)) {
        setCurriculum(courseDetails.data.curriculum);
        setIsPreviewSet(courseDetails.data.curriculum.some((lecture) => lecture.freePreview));
      } else {
        // Handle case where curriculum is undefined or not an array
        setCurriculum([]); // or another appropriate default value
        setIsPreviewSet(false);
      }
    }
  }, [courseDetails, courseId]);

  // Handle switching tabs
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handle curriculum updates
  const handleCurriculumChange = (index, field, value) => {
    const updatedCurriculum = [...curriculum];
    updatedCurriculum[index][field] = value;
    if (field === 'freePreview' && value) setIsPreviewSet(true);
    setCurriculum(updatedCurriculum);
  };

  // Handle form data changes
  const handleCourseInfoChange = (e) => {
    setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value });
  };

  // Upload lecture video
  const handleSingleUpload = async (index, e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axiosInstance.post('/Media/upload', formData);
      const updatedCurriculum = [...curriculum];
      updatedCurriculum[index].videoUrl = data.data.secure_url;
      setCurriculum(updatedCurriculum);
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  // Add another lecture to the curriculum
  const handleAddLecture = () => {
    setCurriculum([...curriculum, { title: '', videoUrl: '', freePreview: false }]);
  };

  // Handle course image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await axiosInstance.post('/Media/upload', formData);
      setCourseInfo({ ...courseInfo, image: data.data.secure_url });
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  // Submit the form (either add a new course or update an existing one)
  const handleSubmit = () => {
    const courseData = {
      ...courseInfo,
      curriculum,
      instructorId: instructor.instructorId,
      instructorName: instructor.instructorName,
    };

    if (courseId) {
      dispatch(updateCourse(courseId, courseData));
      toast.success("Course Updated Successfully");
    } else {
      dispatch(addNewCourse(courseData));
      toast.success("Course Added Successfully");
    }

    // Redirect to the teacher dashboard after submission
    navigate('/teacher/dashboard');
  };

  return (
    <div className="create-course">
      <div className="header">
        <h1>{courseId ? 'Edit Course' : 'Add New Course'}</h1>
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!courseInfo.title || !curriculum.length || !isPreviewSet || !courseInfo.image || loading}
        >
          {courseId ? 'Update' : 'Submit'}
        </button>
      </div>

      <div className="tabs">
        <button
          onClick={() => handleTabClick('curriculum')}
          className={activeTab === 'curriculum' ? 'active' : ''}
        >
          Curriculum
        </button>
        <button
          onClick={() => handleTabClick('landing-page')}
          className={activeTab === 'landing-page' ? 'active' : ''}
        >
          Course Landing Page
        </button>
        <button
          onClick={() => handleTabClick('settings')}
          className={activeTab === 'settings' ? 'active' : ''}
        >
          Settings
        </button>
      </div>

      {activeTab === 'curriculum' && (
        <div className="curriculum-tab">
          <h2>{courseId ? 'Edit Course Curriculum' : 'Create Course Curriculum'}</h2>
          {curriculum.map((lecture, index) => (
            <div key={index} className="lecture-item">
              <div className="lecture-details">
                <label htmlFor={`lecture-title-${index}`}>Lecture Title</label>
                <input
                  id={`lecture-title-${index}`}
                  type="text"
                  placeholder={`Lecture ${index + 1} Title`}
                  value={lecture.title}
                  onChange={(e) => handleCurriculumChange(index, 'title', e.target.value)}
                />
                <label className="preview-checkbox">
                  Free Preview
                  <input
                    type="checkbox"
                    checked={lecture.freePreview}
                    onChange={(e) => handleCurriculumChange(index, 'freePreview', e.target.checked)}
                  />
                </label>
              </div>
              <div className="upload-section">
                <label htmlFor={`lecture-file-${index}`}>Upload Video</label>
                <input
                  id={`lecture-file-${index}`}
                  type="file"
                  onChange={(e) => handleSingleUpload(index, e)}
                />
                {lecture.videoUrl && (
                  <div className="video-preview">
                    <video width="200" controls>
                      <source src={lecture.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            </div>
          ))}
          <button className="add-lecture-btn" onClick={handleAddLecture}>
            Add Another Lecture
          </button>
        </div>
      )}

      {activeTab === 'landing-page' && (
        <div className="landing-page-tab">
          <h2>Course Landing Page</h2>
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter course title"
              value={courseInfo.title}
              onChange={handleCourseInfoChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={courseInfo.category} onChange={handleCourseInfoChange}>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Art">Art</option>
              <option value="Music">Music</option>
              <option value="Science">Science</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="level">Level</label>
            <select id="level" name="level" value={courseInfo.level} onChange={handleCourseInfoChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subtitle">Subtitle</label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              placeholder="Enter course subtitle"
              value={courseInfo.subtitle}
              onChange={handleCourseInfoChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter course description"
              value={courseInfo.description}
              onChange={handleCourseInfoChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="objectives">Objectives</label>
            <textarea
              id="objectives"
              name="objectives"
              placeholder="What will students achieve?"
              value={courseInfo.objectives}
              onChange={handleCourseInfoChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="welcomeMessage">Welcome Message</label>
            <textarea
              id="welcomeMessage"
              name="welcomeMessage"
              placeholder="Welcome message for students"
              value={courseInfo.welcomeMessage}
              onChange={handleCourseInfoChange}
            ></textarea>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="settings-tab">
          <h2>Settings</h2>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Enter course price"
              value={courseInfo.price}
              onChange={handleCourseInfoChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Course Image</label>
            <input type="file" id="image" name="image" onChange={handleImageUpload} />
            {courseInfo.image && (
              <div className="image-preview">
                <img src={courseInfo.image} alt="Course Preview" width="200" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
