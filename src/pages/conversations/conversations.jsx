//External
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

//Styles
import "../../App.css";
import "./conversations.css";

//Libs
import { convertDateToLocaleString, getContactKeyPairs } from "../../utils";
import useGetAsyncActions from "../../hooks/useGetAsyncActions";
import useGetState from "../../hooks/useGetState";
import { updateConversationsListHasMore } from "../../state/action-creators";
import ConversationsList from "../../components/conversationsList";
import ContactsList from "../../components/contactsList";
import Chat from "../../components/chat";

function Conversations() {
  const [activeTab, setActiveTab] = useState("conversations");
  const [activeConversation, setActiveConversation] = useState(false);
  const [currentUserInConversation, setCurrentUserInConversation] =
    useState(null);
  const [contactsQuery, setContactsQuery] = useState("");
  const [conversationsQuery, setConversationsQuery] = useState("");
  const [contactKeyValuePairs, setContactPairs] = useState({});

  const navigate = useNavigate();
  const store = useStore();

  const sortedMessages = store.getState().chat;

  const storedSenders = localStorage.getItem("senders");
  const convListHasMore = localStorage.getItem("convListHasMore");
  const companyNumber = process.env.REACT_APP_COMPANY_NUMBER;
  const sideBarDiv = document.getElementsByClassName("sideBar")[0];
  const chatDiv = document.getElementsByClassName("main_content")[0];

  const unslideBar = () => {
    sideBarDiv.classList.remove("slide-bar");
    sideBarDiv.classList.add("unslide");
    chatDiv.style.display = "block";
  };

  const getUserConversations = async (from) => {
    setCurrentUserInConversation(from);
    setActiveConversation(true);
    fetchChatHistoryAsync(
      true,
      from,
      process.env.REACT_APP_COMPANY_NUMBER,
      new Date()
    );
    const chatMessage = document.getElementById(
      `chat-${sortedMessages.length - 1}`
    );
    chatMessage?.scrollIntoView();
  };

  const {
    fetchConversationsAsync,
    updateRecentSendersAsync,
    updateConversationsAsync,
    fetchChatHistoryAsync,
    updateChatHistoryAsync,
    fetchContactsAsync,
  } = useGetAsyncActions();

  const { conversations, recentSenders, contacts, loadingConversations } =
    useGetState();

  const conversationsEffectRan = useRef(false);
  const sendersEffectRan = useRef(false);
  const conversationsSocketEffectRan = useRef(false);
  const observer = useRef();
  const chatObserver = useRef();

  const lastConversationRef = useCallback((elem) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const dateBefore = convertDateToLocaleString(entries[0].target.id, 90);
        fetchConversationsAsync(store.getState().recentSenders, dateBefore);
      }
    });
    if (elem) observer.current.observe(elem);
  }, []);

  const lastChatRef = useCallback((elem) => {
    if (chatObserver.current) chatObserver.current.disconnect();
    chatObserver.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const dateBefore = convertDateToLocaleString(entries[0].target.id, 90);
        fetchChatHistoryAsync(
          false,
          companyNumber,
          currentUserInConversation,
          dateBefore
        );
      }
    });
    if (elem) chatObserver.current.observe(elem);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
    if (conversationsEffectRan.current === false) {
      fetchContactsAsync();
      const date = new Date();
      const dateBefore = convertDateToLocaleString(
        date.setDate(date.getDate() + 31)
      );

      fetchConversationsAsync(recentSenders, dateBefore);
      conversationsEffectRan.current = true;
    }
  }, []);

  useEffect(() => {
    const pairs = getContactKeyPairs(contacts);
    setContactPairs(pairs);
  }, [contacts]);

  useEffect(() => {
    if (storedSenders && sendersEffectRan.current === false) {
      updateRecentSendersAsync(storedSenders.split(","));
      localStorage.removeItem("senders");
      conversationsEffectRan.current = false;
    }
  }, [storedSenders]);

  useEffect(() => {
    if (
      conversationsEffectRan.current === true &&
      convListHasMore === "false"
    ) {
      updateConversationsListHasMore(false);
    }
  }, [convListHasMore]);

  useEffect(() => {
    localStorage.setItem(
      "currentUserInConversation",
      currentUserInConversation
    );

    if (conversationsSocketEffectRan.current === false) {
      let messages = [];
      const socket = io(`${process.env.REACT_APP_SERVER_URL}`); //make dynamic
      socket.on("new-message", (message) => {
        if (messages[0] != message) {
          messages.push(message);
          updateConversationsAsync(messages.flat());
          message.forEach((msg) => {
            if (
              msg.from == localStorage.getItem("currentUserInConversation") ||
              msg.to == localStorage.getItem("currentUserInConversation")
            ) {
              localStorage.getItem("currentUserInConversation") &&
                updateChatHistoryAsync([msg]);
            }
          });
        }
      });
      conversationsSocketEffectRan.current = true;
    }
  }, [currentUserInConversation]);

  const cachedList = conversations;

  return (
    <div className="container">
      <div className="sideBar conversations_sideBar">
        <p className="conversations_close_btn" onClick={() => unslideBar()}>
          X
        </p>
        <div className="conversations_sideBar_tabs">
          <h3
            className={`tab_heading ${
              activeTab === "conversations" ? "tab_heading_active" : ""
            }`}
            onClick={() => setActiveTab("conversations")}
          >
            Conversations
          </h3>
          <h3
            className={`tab_heading ${
              activeTab === "contacts" ? "tab_heading_active" : ""
            }`}
            onClick={() => setActiveTab("contacts")}
          >
            Contacts
          </h3>
        </div>
        {loadingConversations ? (
          <p className="loading">...Loading</p>
        ) : (
          <div className="sideBar_search">
            <input
              placeholder="search"
              onChange={(e) => {
                activeTab === "contacts"
                  ? setContactsQuery(e.target.value)
                  : setConversationsQuery(e.target.value);
              }}
              value={
                activeTab === "contacts" ? contactsQuery : conversationsQuery
              }
            ></input>
          </div>
        )}
        {activeTab === "conversations" ? (
          <ConversationsList
            cachedList={cachedList}
            conversationsQuery={conversationsQuery}
            contactKeyValuePairs={contactKeyValuePairs}
            lastConversationRef={lastConversationRef}
            getUserConversations={getUserConversations}
            unslideBar={unslideBar}
          />
        ) : (
          <ContactsList
            contacts={contacts}
            contactsQuery={contactsQuery}
            unslideBar={unslideBar}
            getUserConversations={getUserConversations}
          />
        )}
      </div>
      <Chat
        activeConversation={activeConversation}
        contactKeyValuePairs={contactKeyValuePairs}
        currentUserInConversation={currentUserInConversation}
        lastChatRef={lastChatRef}
      />
    </div>
  );
}

export default Conversations;
