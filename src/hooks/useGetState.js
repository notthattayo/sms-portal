import { useSelector } from "react-redux";

function useGetState() {
  const state = useSelector((state) => state);
  return {
    conversations: state.conversations,
    loadingConversations: state.loadingConversations,
    recentSenders: state.recentSenders,
    contacts: state.contacts,
    employee: state.employee,
    generalError: state.generalError,
    generalSuccess: state.generalSuccess,
    generalLoading: state.generalLoading,
    chat: state.chat,
  };
}

export default useGetState;
