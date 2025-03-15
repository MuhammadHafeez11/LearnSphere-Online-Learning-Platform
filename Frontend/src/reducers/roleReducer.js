import {
    GET_ROLE_ID_BY_NAME_REQUEST,
    GET_ROLE_ID_BY_NAME_SUCCESS,
    GET_ROLE_ID_BY_NAME_FAIL,
    CLEAR_ROLE_ERRORS,
} from '../constants/roleConstant';

const initialState = {
    roleLoading: false,
    data: null,
    success: false,
  };

export const getRoleIdByNameReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ROLE_ID_BY_NAME_REQUEST:
        return {
          roleLoading: true,
          role: []
        };
      case GET_ROLE_ID_BY_NAME_SUCCESS:
        return {
          roleLoading: false,
          role: action.payload,
        };
      case GET_ROLE_ID_BY_NAME_FAIL:
        return {
          ...state,
          roleLoading: false,
          role: null,
        };
      case CLEAR_ROLE_ERRORS:
        return {
          ...state,
          roleError: null,
        };
      default:
        return state;
    }
  };
  