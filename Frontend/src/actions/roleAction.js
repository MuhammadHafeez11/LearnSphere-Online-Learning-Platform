// actions/roleAction.js
import axiosInstance from '../api/axiosInstance';
import { 
    GET_ROLE_ID_BY_NAME_REQUEST,
     GET_ROLE_ID_BY_NAME_SUCCESS, 
     GET_ROLE_ID_BY_NAME_FAIL 
    } from '../constants/roleConstant';
import { setError, clearErrors } from './errorAction';

export const getRoleIdByName = (roleName) => async (dispatch) => {
    try {
        dispatch({ type: GET_ROLE_ID_BY_NAME_REQUEST });
        dispatch(clearErrors());

        const { data } = await axiosInstance.get(`/role/${roleName}`);

        // console.log(data);

        dispatch({
            type: GET_ROLE_ID_BY_NAME_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({ type: GET_ROLE_ID_BY_NAME_FAIL });
        dispatch(setError(error.response?.data?.message || "Role fetching failed"));
    }
};
