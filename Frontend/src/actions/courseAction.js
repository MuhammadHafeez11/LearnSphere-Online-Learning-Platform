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

import { setError, clearErrors } from './errorAction'; // Use error handling actions
import axiosInstance from '../api/axiosInstance';


export const getCourses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COURSES_REQUEST });
    
    const { data } = await axiosInstance.get('/Course/get');
    
    dispatch({ type: GET_COURSES_SUCCESS, payload: data });
    
    dispatch(clearErrors());  // Clear any errors after success
  } catch (error) {
    dispatch({
      type: GET_COURSES_FAIL,
      payload: error.response?.data?.message || 'Failed to fetch courses',
    });
    
    dispatch(setError(error.response?.data?.message || 'Failed to fetch courses'));
  }
};


export const addNewCourse = (courseData) => async (dispatch) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axiosInstance.post('/Course/add', courseData, config);
    dispatch({ type: ADD_COURSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADD_COURSE_FAIL, payload: error.response.data.message });
  }
};


// Fetch course details by ID
export const getCourseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });

    const { data } = await axiosInstance.get(`/Course/get/${id}`);

    console.log(data);
    

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Update course by ID
export const updateCourse = (id, courseData) => async (dispatch) => {
  try {
    dispatch({ type: COURSE_UPDATE_REQUEST });

    const { data } = await axiosInstance.put(`/Course/update/${id}`, courseData);

    dispatch({
      type: COURSE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_UPDATE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
