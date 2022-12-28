import { combineReducers } from "redux";
import {
  conversationsReducer,
  recentSendersReducer,
  conversationsListHasMoreReducer,
  loadConversationsReducer,
} from "./conversationsReducer";
import { chatReducer } from "./chatReducer";
import { contactsReducer } from "./contactsReducer.js";
import { employeeReducer } from "./employeesReducer";
import {
  generalErrorReducer,
  generalLoadingReducer,
  generalSuccessReducer,
} from "./notificationsReducer";

const reducers = combineReducers({
  conversations: conversationsReducer,
  recentSenders: recentSendersReducer,
  conversationsListHasMore: conversationsListHasMoreReducer,
  loadingConversations: loadConversationsReducer,
  chat: chatReducer,
  contacts: contactsReducer,
  employee: employeeReducer,
  generalError: generalErrorReducer,
  generalSuccess: generalSuccessReducer,
  generalLoading: generalLoadingReducer,
});

export default reducers;
