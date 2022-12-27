import { AUTH_EMPLOYEE } from "../actions";

export const employeeReducer = (state = [], action) => {
  switch (action.type) {
    case AUTH_EMPLOYEE:
      return [...action.payload];
    default:
      return state;
  }
};
