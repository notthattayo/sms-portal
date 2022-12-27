import {
  FETCH_CONTACTS,
  SAVE_CONTACT,
  GENERAL_SUCCESS_MESSAGE,
  GENERAL_ERROR_MESSAGE,
} from "../actions";

import store from "../store";
import axios from "axios";

export const fetchContacts = () => {
  return async (dispatch) => {
    const state = store.getState();
    let contacts;

    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/contacts`)
      .then((res) => {
        contacts = res.data.result;
        dispatch({
          type: FETCH_CONTACTS,
          payload: contacts,
        });
      })
      .catch((err) => {
        dispatch({
          type: GENERAL_ERROR_MESSAGE,
          payload:
            "An error occured fetching contacts, please check your network connection",
        });

        setTimeout(
          () =>
            dispatch({
              type: GENERAL_ERROR_MESSAGE,
              payload: "",
            }),
          3000
        );
      });
  };
};

export const saveContact = (payload) => {
  return async (dispatch) => {
    const state = store.getState();
    let contact = [];
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/contacts`, {
        name: payload.name,
        phone: payload.phone,
      })
      .then((res) => {
        contact.push(res.data.result);
        dispatch({
          type: GENERAL_SUCCESS_MESSAGE,
          payload: `${payload.name} was added to your contacts`,
        });

        dispatch({
          type: SAVE_CONTACT,
          payload: contact.concat(state.contacts),
        });

        setTimeout(
          () =>
            dispatch({
              type: GENERAL_SUCCESS_MESSAGE,
              payload: "",
            }),
          5000
        );
      })
      .catch((err) => {
        dispatch({
          type: GENERAL_ERROR_MESSAGE,
          payload: err.message,
        });
        setTimeout(
          () =>
            dispatch({
              type: GENERAL_ERROR_MESSAGE,
              payload: "",
            }),
          5000
        );
      });
  };
};

export const updateContact = (payload) => {
  return async (dispatch) => {
    let contact = [];
    await axios
      .put(`${process.env.REACT_APP_SERVER_URL}/contacts`, {
        id: payload._id,
        name: payload.name,
        phone: payload.phone,
      })
      .then(async (res) => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/contacts`
        );
        contact = data.result;
        dispatch({
          type: GENERAL_SUCCESS_MESSAGE,
          payload: `contact was added updated successfully`,
        });

        setTimeout(
          () =>
            dispatch({
              type: GENERAL_SUCCESS_MESSAGE,
              payload: "",
            }),
          3000
        );
      })
      .catch((err) => {
        dispatch({
          type: GENERAL_ERROR_MESSAGE,
          payload: err.message,
        });

        setTimeout(
          () =>
            dispatch({
              type: GENERAL_ERROR_MESSAGE,
              payload: "",
            }),
          3000
        );
      });

    dispatch({
      type: FETCH_CONTACTS,
      payload: contact,
    });
  };
};

export const deleteContact = (_id) => {
  return async (dispatch) => {
    const state = store.getState();
    let contact = [];
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/contacts/${_id}`)
      .then(async (res) => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/contacts`
        );
        contact = data.result;
        dispatch({
          type: GENERAL_SUCCESS_MESSAGE,
          payload: `contact was deleted successfully`,
        });

        setTimeout(
          () =>
            dispatch({
              type: GENERAL_SUCCESS_MESSAGE,
              payload: "",
            }),
          3000
        );
      })
      .catch((err) => {
        dispatch({
          type: GENERAL_ERROR_MESSAGE,
          payload: "error deleting contact. Try again later",
        });

        setTimeout(
          () =>
            dispatch({
              type: GENERAL_ERROR_MESSAGE,
              payload: "",
            }),
          3000
        );
      });

    dispatch({
      type: FETCH_CONTACTS,
      payload: contact,
    });
  };
};
