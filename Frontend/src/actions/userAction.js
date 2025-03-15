import { 
  USER_REGISTER_REQUEST, 
  USER_REGISTER_SUCCESS, 
  USER_REGISTER_FAIL, 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL,
  USER_LOGOUT 
} from '../constants/userConstants';
import { setError } from './errorAction';
import axiosInstance from '../api/axiosInstance';

// User Registration Action
export const userRegister = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axiosInstance.post('/User/new', formData);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch(setError(error.response.data.message || 'Failed to register'));
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// User Login Action
export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axiosInstance.post('/User/login', { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch(setError(error.response.data.message || 'Login failed'));
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// User Logout Action
export const userLogout = () => (dispatch) => {
    try {
      // Remove user data from local storage
      localStorage.removeItem('user');
      
      // Dispatch the logout action
      dispatch({ type: USER_LOGOUT });
    } catch (error) {
      dispatch(setError('Logout failed.'));
    }
  };