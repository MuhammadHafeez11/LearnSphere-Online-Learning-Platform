import { 
  LOGIN_STUDENT_REQUEST,
  LOGIN_STUDENT_SUCCESS,
  LOGIN_STUDENT_FAIL,
  REGISTER_STUDENT_REQUEST,
  REGISTER_STUDENT_SUCCESS,
  REGISTER_STUDENT_FAIL
} from "../constants/studentConstant";

const initialState = {
  user: {},
  studentLoading: false,
  success: false,
};

export const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_STUDENT_REQUEST:
    case REGISTER_STUDENT_REQUEST:
      return {
        ...state,
        studentLoading: true,
        success: false,
      };
    case LOGIN_STUDENT_SUCCESS:
      return {
        ...state,
        studentLoading: false,
        success: true,
        user: action.payload.user,
      };
    case REGISTER_STUDENT_SUCCESS:
      return {
        ...state,
        studentLoading: false,
        success: true,
        user: action.payload.user,
      };
    case LOGIN_STUDENT_FAIL:
    case REGISTER_STUDENT_FAIL:
      return {
        ...state,
        studentLoading: false,
        success: false,
      };
    default:
      return state;
  }
};

