// actions/errorActions.js
import { 
    SET_ERROR, 
    CLEAR_ERRORS 
} from "../constants/errorConstant";

// Set error
export const setError = (message) => (dispatch) => {
  dispatch({ type: SET_ERROR, payload: message });
};

// Clear all errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
