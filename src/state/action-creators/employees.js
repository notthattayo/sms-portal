import axios from "axios";
import { AUTH_EMPLOYEE } from "../actions";
export const registerEmployee = (registerObj) => {
  return async (dispatch) => {
    const { email, password } = registerObj;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        {
          email,
          password,
        }
      );
      dispatch({
        type: AUTH_EMPLOYEE,
        payload: [data.result],
      });
    } catch (err) {
      console.log(err, "error");
    }
  };
};

export const loginEmployee = (registerObj) => {
  return async (dispatch) => {
    const { email, password } = registerObj;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          email,
          password,
        }
      );
      dispatch({
        type: AUTH_EMPLOYEE,
        payload: [data.result],
      });
    } catch (err) {
      console.log(err, "error");
    }
  };
};
