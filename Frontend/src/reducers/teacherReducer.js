import { 
    REGISTER_TEACHER_REQUEST, 
    REGISTER_TEACHER_SUCCESS, 
    REGISTER_TEACHER_FAIL 
} from "../constants/teacherConstant.js";

const initialState = {
    teacherLoading: false,
    success: false,
    user: null
};

export const teacherReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_TEACHER_REQUEST:
            return {
                ...state,
                teacherLoading: true,
                success: false
            };
        case REGISTER_TEACHER_SUCCESS:
            return {
                ...state,
                teacherLoading: false,
                success: true,
                user: action.payload
            };
        case REGISTER_TEACHER_FAIL:
            return {
                ...state,
                teacherLoading: false,
                success: false
            };
        default:
            return state;
    }
};
