import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export function useGetAsyncActions() {
  const dispatch = useDispatch();
  const {
    fetchConversations,
    updateRecentSenders,
    updateConversations,
    updateConversationsListHasMore,
    fetchChatHistory,
    updateChatHistory,
    fetchContacts,
    saveContact,
    updateContact,
    deleteContact,
    sendChat,
    registerEmployee,
    loginEmployee,
  } = bindActionCreators(actionCreators, dispatch);

  return {
    fetchConversationsAsync: fetchConversations,
    updateConversationsAsync: updateConversations,
    updateRecentSendersAsync: updateRecentSenders,
    updateConversationsListHasMoreAsync: updateConversationsListHasMore,
    fetchChatHistoryAsync: fetchChatHistory,
    updateChatHistoryAsync: updateChatHistory,
    fetchContactsAsync: fetchContacts,
    saveContactAsync: saveContact,
    updateContactAsync: updateContact,
    deleteContactAsync: deleteContact,
    sendChatAsync: sendChat,
    registerEmployeeAsync: registerEmployee,
    loginEmployeeAsync: loginEmployee,
  };
}

export default useGetAsyncActions;
