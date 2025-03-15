import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Login from './pages/User/LoginSignup/Login.js'
import StudentSignUp from './pages/User/LoginSignup/StudentSignUp.js'
import TeacherSignUp from './pages/User/LoginSignup/TeacherSignUp.js'
import TeacherDashboard from './pages/User/TeacherDashboard/TeacherDashboard.js'
import StudentDashboard from './pages/User/StudentDashboard/StudentDashboard.js'
import CourseDetails from './pages/User/StudentDashboard/CourseDetails.js'
import CreateCourse from './pages/User/TeacherDashboard/TeacherTabs/MyCourseTab/CreateAndEditCourse.js'
import SignUp from './pages/User/LoginSignup/Signup.js';
import ProtectedRoute from './components/route-guard/protectedRoutes.js';
import CourseWatchPage from './pages/User/StudentDashboard/CourseWatchPage.js';

function App() {
  return (
    <Router>
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/teacher/signup' element={<TeacherSignUp />}/>
        <Route path='/user/signup' element={<StudentSignUp />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route
          path='/teacher/dashboard'
          element={
            <ProtectedRoute allowedRoles={['Staff']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/teacher/new-course'
          element={
            <ProtectedRoute allowedRoles={['Staff']}>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path='/teacher/edit-course/:courseId'
          element={
            <ProtectedRoute allowedRoles={['Staff']}>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path='/student/dashboard'
          element={
            <ProtectedRoute allowedRoles={[ 'Student', 'Staff']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/course/follow/:id'
          element={
            <ProtectedRoute allowedRoles={[ 'Student']}>
              <CourseWatchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/course/details/:id'
          element={
            <ProtectedRoute allowedRoles={[ 'Student', 'Staff']}>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
    </Routes>
    </Router>
  );
}

export default App;
