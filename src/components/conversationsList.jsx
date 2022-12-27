import React from "react";

function ConversationsList({
  cachedList,
  conversationsQuery,
  getUserConversations,
  lastConversationRef,
  contactKeyValuePairs,
  unslideBar,
}) {
  return (
    <div className="conversations_sideBar_list">
      {cachedList
        .filter(
          (message) =>
            message.to.includes(conversationsQuery) ||
            message.body.toLowerCase().includes(conversationsQuery) ||
            message.from.includes(conversationsQuery) ||
            contactKeyValuePairs[message.from]
              ?.toLowerCase()
              .includes(conversationsQuery)
        )
        .map((message, index) => {
          if (cachedList.length === index + 1) {
            return (
              <div
                className="conversations_sideBar_list_item"
                onClick={() => {
                  getUserConversations(message.from);
                  unslideBar();
                }}
                ref={lastConversationRef}
                id={message.dateSent}
                key={message._id}
              >
                <div className="list_item_avatar">
                  <img src="https://www.pngmart.com/files/21/Account-User-PNG-Clipart.png"></img>
                </div>

                <div className="list_item_details">
                  <h3>{contactKeyValuePairs[message.from] ?? message.from}</h3>
                  <p>{message.body}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                className="conversations_sideBar_list_item"
                key={message._id}
                onClick={() => {
                  getUserConversations(message.from);
                  unslideBar();
                }}
              >
                <div className="list_item_avatar">
                  <img src="https://www.pngmart.com/files/21/Account-User-PNG-Clipart.png"></img>
                </div>

                <div className="list_item_details">
                  <h3>{contactKeyValuePairs[message.from] ?? message.from}</h3>
                  <p>{message.body}</p>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}

export default ConversationsList;
