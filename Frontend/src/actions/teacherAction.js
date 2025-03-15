import axiosInstance from "../api/axiosInstance";
import { 
    REGISTER_TEACHER_REQUEST, 
    REGISTER_TEACHER_SUCCESS, 
    REGISTER_TEACHER_FAIL 
} from "../constants/teacherConstant.js";
import { setError, clearErrors } from "./errorAction";

// Teacher Signup
export const teacherSignUp = (formData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_TEACHER_REQUEST });
        dispatch(clearErrors());

        const { data } = await axiosInstance.post('/Staff/new', formData);

        dispatch({ type: REGISTER_TEACHER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: REGISTER_TEACHER_FAIL });
        dispatch(setError(error.response?.data?.message || 'Teacher registration failed'));
    }
};
