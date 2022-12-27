import { FETCH_USER_CHATS, UPDATE_USER_CHATS, SEND_CHAT } from "../actions";

export const chatReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_CHATS:
      return [...action.payload];
    case UPDATE_USER_CHATS:
      return [...action.payload];
    case SEND_CHAT:
      return [...action.payload];
    default:
      return state;
  }
};
