// reducers/courseReducer.js
import {
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAIL,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    COURSE_UPDATE_REQUEST,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_FAIL,
  } from '../constants/courseConstant';
  
  export const getAllCoursesReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
      case GET_COURSES_REQUEST:
        return { loading: true, courses: [] };
      
      case GET_COURSES_SUCCESS:
        return { loading: false, courses: action.payload.data };
      
      case GET_COURSES_FAIL:
        return { loading: false, error: action.payload };
      
      default:
        return state;
    }
  };
  

export const addNewCourseReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case ADD_COURSE_SUCCESS:
      return { ...state, course: action.payload, success: true };
    case ADD_COURSE_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const courseDetailsReducer = (state = { courseDetails: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case COURSE_DETAILS_SUCCESS:
      return { loading: false, courseDetails: action.payload, success: true };
    case COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case COURSE_UPDATE_REQUEST:
      return { loading: true };
    case COURSE_UPDATE_SUCCESS:
      return { loading: false, success: true, course: action.payload };
    case COURSE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};