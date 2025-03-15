// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { StudentReducer } from "./reducers/studentReducer";
import { getRoleIdByNameReducer } from "./reducers/roleReducer";
import { errorReducer } from "./reducers/errorReducer";
import { teacherReducer } from "./reducers/teacherReducer";
import {  addNewCourseReducer, courseDetailsReducer, courseUpdateReducer, getAllCoursesReducer } from "./reducers/courseReducer";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
    student: StudentReducer,
    role: getRoleIdByNameReducer,
    teacher: teacherReducer,
    courseData: getAllCoursesReducer,
    addCourse : addNewCourseReducer,
    user: userReducer,
    courseDetails: courseDetailsReducer,
    updateCourse: courseUpdateReducer,
    error: errorReducer,  
});

let initialState = {
  student: [],
  teacher: [],
    role: [],
    courseData: [],
    addCourse: [],
    courseDetails: [],
    updateCourse: [],
    user: [],
    error: [],
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
