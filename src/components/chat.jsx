import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";
import useGetState from "../hooks/useGetState";
import useGetAsyncActions from "../hooks/useGetAsyncActions";
import { checkNewDayMessage, getTimeStamp } from "../utils";

function Chat({
  activeConversation,
  contactKeyValuePairs,
  currentUserInConversation,
  lastChatRef,
}) {
  const [chatMessage, setChatMessage] = useState("");
  const { sendChatAsync } = useGetAsyncActions();
  const { generalError, generalSuccess, chat } = useGetState();
  const companyNumber = process.env.REACT_APP_COMPANY_NUMBER;
  const currentLoggedInUser = JSON.parse(localStorage.getItem("user"));

  const sideBarDiv = document.getElementsByClassName("sideBar")[0];
  const chatDiv = document.getElementsByClassName("main_content")[0];

  const slideBar = () => {
    sideBarDiv.classList.remove("unslide");
    sideBarDiv.classList.add("slide-bar");
    chatDiv.style.display = "none";
  };

  useEffect(() => {
    const chatMessage = document.getElementById(`chat-${chat.length - 1}`);
    chatMessage?.scrollIntoView();
  }, [chat]);
  return (
    <div className="main_content">
      <div className="main_content_logout">
        <div className="conversations_hamburger" onClick={() => slideBar()}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>{currentLoggedInUser?.email}</p>{" "}
        <span
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </span>
      </div>
      {!activeConversation ? (
        <div className="conversations_empty">
          <p onClick={() => slideBar()}>
            <span>&#8592;</span> Start or continue a conversation
          </p>
          <img src="start-convo.png"></img>
        </div>
      ) : (
        <div className="conversations_filled" id="chat-view">
          <h2>
            {contactKeyValuePairs[currentUserInConversation] ??
              currentUserInConversation}
          </h2>
          <div className="conversations_container">
            {chat.map((message, index) => {
              if (index === 0) {
                return (
                  <>
                    <div
                      ref={lastChatRef}
                      id={message.dateUpdated}
                      key={message._id}
                    >
                      <p className="new_day_message">
                        {checkNewDayMessage(
                          chat[chat.indexOf(message) - 1]?.dateUpdated,
                          message.dateUpdated
                        )}
                      </p>
                    </div>

                    <div
                      className="conversations_message_container"
                      id={message.dateUpdated}
                    >
                      <p
                        className={`${
                          message.from === "+447361589344"
                            ? "conversations_message_to"
                            : "conversations_message_from"
                        }`}
                      >
                        {message.body}
                      </p>
                      <span>{getTimeStamp(message.dateUpdated)}</span>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div>
                      <p className="new_day_message">
                        {checkNewDayMessage(
                          chat[chat.indexOf(message) - 1]?.dateUpdated,
                          message.dateUpdated
                        )}
                      </p>
                    </div>

                    <div className="conversations_message_container">
                      <p
                        className={`${
                          message.from === "+447361589344"
                            ? "conversations_message_to"
                            : "conversations_message_from"
                        }`}
                        id={`chat-${index}`}
                      >
                        {message.body}
                      </p>
                      <span>{getTimeStamp(message.dateUpdated)}</span>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      )}
      {activeConversation && (
        <div className="chat_box">
          <textarea
            placeholder="send a message"
            maxLength={250}
            id={"chat_box"}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === "enter") {
                e.preventDefault();
                sendChatAsync({
                  from: companyNumber,
                  to: currentUserInConversation,
                  body: chatMessage,
                });
                setChatMessage("");
              }
            }}
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          ></textarea>
          <button
            onClick={() => {
              sendChatAsync({
                from: companyNumber,
                to: currentUserInConversation,
                body: chatMessage,
              });
              setChatMessage("");
            }}
          >
            Send
          </button>
        </div>
      )}
      {generalError ||
        (generalSuccess && (
          <div
            className={`feedback ${
              generalError ? "error" : "success"
            } feedback-mobile`}
          >
            <p>{generalError || generalSuccess}</p>
          </div>
        ))}
    </div>
  );
}

export default Chat;
