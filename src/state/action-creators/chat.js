import { FETCH_USER_CHATS, SEND_CHAT, UPDATE_USER_CHATS } from "../actions";
import { sortMessages, updateSortedMessages } from "../../utils";
import store from "../store";
import axios from "axios";

export const fetchChatHistory = (clear, from, to, dateBefore) => {
  return async (dispatch) => {
    const state = store.getState();
    if ((from, to, dateBefore)) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/messages/list-chat-history`,
        {
          from,
          to,
          dateBefore,
        }
      );

      const chats = sortMessages(
        clear ? [] : state.chat,
        data.historyTo,
        data.historyFrom
      );

      dispatch({
        type: FETCH_USER_CHATS,
        payload: chats,
      });
    }
  };
};

export const updateChatHistory = (message) => {
  return async (dispatch) => {
    const state = store.getState();
    const chats = updateSortedMessages(state.chat, message);

    dispatch({
      type: UPDATE_USER_CHATS,
      payload: chats,
    });
  };
};

export const sendChat = (chatObj) => {
  return async (dispatch) => {
    const { from, to, body } = chatObj;
    const state = store.getState();

    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/messages`,
      {
        from,
        to,
        body,
      }
    );

    const chats = updateSortedMessages(state.chat, data);
    dispatch({
      type: UPDATE_USER_CHATS,
      payload: chats,
    });
  };
};
