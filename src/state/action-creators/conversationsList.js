import {
  FETCH_CONVERSATIONS,
  UPDATE_CONVERSATIONS,
  UPDATE_RECENT_SENDERS,
  UPDATE_CONVERSATIONS_LIST_HAS_MORE,
  LOADING_CONVERSATIONS,
  GENERAL_ERROR_MESSAGE,
} from "../actions";
import {
  cleanUpConversationsList,
  updateConversationsListWithNew,
} from "../../utils";
import store from "../store";
import axios from "axios";

export const fetchConversations = (recentSenders, dateBefore) => {
  return async (dispatch) => {
    const state = store.getState();
    let conversationsList;

    if (state.conversationsListHasMore) {
      try {
        dispatch({
          type: LOADING_CONVERSATIONS,
          payload: true,
        });
        await axios
          .get(`${process.env.REACT_APP_SERVER_URL}/messages/${dateBefore}`)
          .then((res) => {
            conversationsList = res.data;
            dispatch({
              type: LOADING_CONVERSATIONS,
              payload: false,
            });
          });
      } catch (err) {
        console.log(err);
        dispatch({
          type: LOADING_CONVERSATIONS,
          payload: false,
        });
        await dispatch({
          type: GENERAL_ERROR_MESSAGE,
          payload: "An error occured, please check your network connection",
        });

        setTimeout(
          () =>
            dispatch({
              type: GENERAL_ERROR_MESSAGE,
              payload: "",
            }),
          3000
        );
      }

      if (conversationsList && conversationsList.length === 0) {
        localStorage.setItem("convListHasMore", "false");
      } else {
        if (conversationsList) {
          const list = await cleanUpConversationsList(
            recentSenders,
            conversationsList,
            state.conversations
          );

          localStorage.setItem("senders", list.senders);
          dispatch({
            type: FETCH_CONVERSATIONS,
            payload: list.latestConversationsList,
          });
        }
      }
    }
  };
};

export const updateRecentSenders = (senders) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_RECENT_SENDERS,
      payload: senders,
    });
  };
};

export const updateConversations = (newConversations) => {
  return async (dispatch) => {
    const state = store.getState();
    const list = await updateConversationsListWithNew(
      state.recentSenders,
      newConversations,
      state.conversations
    );

    localStorage.setItem("senders", list.latestSenders);
    dispatch({
      type: UPDATE_CONVERSATIONS,
      payload: list.finalConversations,
    });
  };
};

export const updateConversationsListHasMore = (hasMore) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_CONVERSATIONS_LIST_HAS_MORE,
      payload: hasMore,
    });
  };
};
