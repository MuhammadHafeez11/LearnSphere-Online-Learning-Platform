// reducers/errorReducer.js
import {
     SET_ERROR,
      CLEAR_ERRORS 
    } from "../constants/errorConstant";

const initialState = {
  errorMessage: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
};
