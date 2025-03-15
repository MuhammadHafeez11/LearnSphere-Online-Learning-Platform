// actions/studentAction.js
import axiosInstance from "../api/axiosInstance";
import { 
    LOGIN_STUDENT_REQUEST,
    LOGIN_STUDENT_SUCCESS,
    LOGIN_STUDENT_FAIL,
    REGISTER_STUDENT_REQUEST,
    REGISTER_STUDENT_SUCCESS,
    REGISTER_STUDENT_FAIL
} from "../constants/studentConstant";
import { setError, clearErrors } from "./errorAction";

// Login Student
export const studentLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_STUDENT_REQUEST });
        dispatch(clearErrors());

        const { data } = await axiosInstance.post('/Student/login', { email, password });

        dispatch({ type: LOGIN_STUDENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_STUDENT_FAIL });
        dispatch(setError(error.response?.data?.message || "Login failed"));
    }
};

// Register Student
export const studentRegister = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_STUDENT_REQUEST });
        dispatch(clearErrors());

        const { data } = await axiosInstance.post('/Student/new', userData);

        dispatch({ type: REGISTER_STUDENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: REGISTER_STUDENT_FAIL });
        dispatch(setError(error.response?.data?.message || "Registration failed"));
    }
};
