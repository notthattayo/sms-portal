import {
  GENERAL_ERROR_MESSAGE,
  GENERAL_LOADING,
  GENERAL_SUCCESS_MESSAGE,
} from "../actions";

export const generalErrorReducer = (state = null, action) => {
  switch (action.type) {
    case GENERAL_ERROR_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export const generalSuccessReducer = (state = null, action) => {
  switch (action.type) {
    case GENERAL_SUCCESS_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

export const generalLoadingReducer = (state = null, action) => {
  switch (action.type) {
    case GENERAL_LOADING:
      return action.payload;
    default:
      return state;
  }
};
