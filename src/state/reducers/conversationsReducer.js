import {
  FETCH_CONVERSATIONS,
  UPDATE_CONVERSATIONS,
  UPDATE_RECENT_SENDERS,
  UPDATE_CONVERSATIONS_LIST_HAS_MORE,
  LOADING_CONVERSATIONS,
} from "../actions";

export const conversationsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CONVERSATIONS:
      return [...state, ...action.payload];
    case UPDATE_CONVERSATIONS:
      return [...action.payload];
    default:
      return state;
  }
};

export const recentSendersReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_RECENT_SENDERS:
      return [...action.payload];
    default:
      return state;
  }
};

export const conversationsListHasMoreReducer = (state = true, action) => {
  switch (action.type) {
    case UPDATE_CONVERSATIONS_LIST_HAS_MORE:
      return action.payload;
    default:
      return state;
  }
};

export const loadConversationsReducer = (state = false, action) => {
  switch (action.type) {
    case LOADING_CONVERSATIONS:
      return action.payload;
    default:
      return state;
  }
};
