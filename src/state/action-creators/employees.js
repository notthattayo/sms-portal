import axios from "axios";
import { AUTH_EMPLOYEE, GENERAL_LOADING } from "../actions";
export const registerEmployee = (registerObj) => {
  return async (dispatch) => {
    const { email, password } = registerObj;
    try {
      dispatch({
        type: GENERAL_LOADING,
        payload: true,
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        {
          email,
          password,
        }
      );
      dispatch({
        type: GENERAL_LOADING,
        payload: false,
      });
      dispatch({
        type: AUTH_EMPLOYEE,
        payload: [data.result],
      });
    } catch (err) {
      console.log(err, "error");
      dispatch({
        type: GENERAL_LOADING,
        payload: false,
      });
    }
  };
};

export const loginEmployee = (registerObj) => {
  return async (dispatch) => {
    const { email, password } = registerObj;
    try {
      dispatch({
        type: GENERAL_LOADING,
        payload: true,
      });
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          email,
          password,
        }
      );
      dispatch({
        type: GENERAL_LOADING,
        payload: false,
      });
      dispatch({
        type: AUTH_EMPLOYEE,
        payload: [data.result],
      });
    } catch (err) {
      console.log(err, "error");
      dispatch({
        type: GENERAL_LOADING,
        payload: false,
      });
    }
  };
};
