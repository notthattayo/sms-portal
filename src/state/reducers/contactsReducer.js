import { FETCH_CONTACTS, SAVE_CONTACT } from "../actions";

export const contactsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return [...action.payload];
    case SAVE_CONTACT:
      return [...action.payload];
    default:
      return state;
  }
};
