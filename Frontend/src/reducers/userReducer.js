import { 
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL,
    USER_LOGOUT 
  } from '../constants/userConstants';
  
  export const userReducer = (state = { user: null }, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
      case USER_LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_REGISTER_SUCCESS:
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          success: action.payload.success,
          message: action.payload.message,
        };
      case USER_REGISTER_FAIL:
      case USER_LOGIN_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case USER_LOGOUT:
          return {
            ...state,
            user: null, // Clear user data from the state
          };
      default:
        return state;
    }
  };
  