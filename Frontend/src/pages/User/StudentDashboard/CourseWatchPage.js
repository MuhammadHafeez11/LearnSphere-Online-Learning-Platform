import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '../../../actions/courseAction';
import './CourseWatchPage.css'; // Add your custom CSS styles

const CourseWatchPage = () => {
  const dispatch = useDispatch();
  const { courseDetails, loading, error } = useSelector((state) => state.courseDetails);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [completedLectures, setCompletedLectures] = useState([]);

  // Get course ID from route parameters
  const { id } = useParams();

  // Fetch course details by ID
  useEffect(() => {
    dispatch(getCourseDetails(id));
  }, [dispatch, id]);

  // Function to set current lecture for the video player
  const handleLectureSelect = (lecture) => {
    setCurrentLecture(lecture);
  };

  // Mark a lecture as completed when video ends
  const handleVideoEnd = () => {
    if (!completedLectures.includes(currentLecture?.title)) {
      setCompletedLectures([...completedLectures, currentLecture?.title]);
    }
  };

  // Render loading state or error if needed
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading course...</div>;

  // Add null checks for courseDetails and its data
  return (
    <div className="course-watch-page">
      {/* Left Sidebar: Course Curriculum */}
      <aside className="course-curriculum">
        {courseDetails?.data?.title ? (
          <>
            <h2>{courseDetails.data.title}</h2>
            <ul>
              {courseDetails.data.curriculum.map((lecture) => (
                <li
                  key={lecture._id}
                  onClick={() => handleLectureSelect(lecture)}
                  className={`lecture-item ${completedLectures.includes(lecture.title) ? 'completed' : ''}`}
                >
                  {lecture.title} 
                  {lecture.freePreview && <span className="preview-badge">Free Preview</span>}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div>No course details available</div>
        )}
      </aside>

      {/* Main Content: Video Player */}
      <main className="course-video-section">
        {currentLecture ? (
          <>
            <h3>{currentLecture.title}</h3>
            <video
              src={currentLecture.videoUrl}
              controls
              onEnded={handleVideoEnd}
              className="course-video-player"
            />
          </>
        ) : (
          <div className="no-lecture-selected">Select a lecture to start learning!</div>
        )}
      </main>
    </div>
  );
};

export default CourseWatchPage;
