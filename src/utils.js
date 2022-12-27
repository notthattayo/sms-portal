import moment from "moment";

export const cleanUpConversationsList = async (
  latestSenders,
  fetchedConversations,
  conversations
) => {
  //A function to only show the most recent message in a conversations list when fetching from the backend.

  let senders = latestSenders.slice();
  let latestConversationsList = [...fetchedConversations];
  const allConversations = conversations.concat(fetchedConversations);

  allConversations.forEach((message) => {
    if (senders.includes(message.from)) {
      latestConversationsList.splice(
        latestConversationsList.indexOf(message),
        1
      );

      if (latestConversationsList.indexOf(message) === 0) {
        latestConversationsList.pop();
      }
    } else {
      senders.push(message.from);
    }
  });
  return {
    latestConversationsList,
    senders: senders.flat(),
  };
};

export const updateConversationsListWithNew = async (
  latestSenders,
  newConversations,
  conversations
) => {
  //A function to update the most recent message in a conversations list when gotten through websockets.

  let senders = latestSenders.slice();
  let allConversations = conversations.slice();
  let finalConversations = [];

  for (var i = 0; i < allConversations.length; i++) {
    for (var j = 0; j < newConversations.length; j++) {
      if (allConversations[i]?.from === newConversations[j]?.from) {
        allConversations.splice(
          allConversations.indexOf(allConversations[i]),
          1
        );
        finalConversations.push(newConversations[j]);
      }
    }
  }

  newConversations.forEach((conversation) => {
    if (!senders.includes(conversation.from)) {
      latestSenders.push(conversation.from);
      finalConversations.push(conversation);
    }
  });

  let final = finalConversations.concat(allConversations);
  return { finalConversations: final, latestSenders };
};

export const sortMessages = (chatState, messagesTo, messagesFrom) => {
  let newArray = messagesTo.concat(messagesFrom).concat(chatState);

  return newArray
    .sort((a, b) => {
      return new Date(b.dateUpdated) - new Date(a.dateUpdated);
    })
    .reverse();
};

export const updateSortedMessages = (chatState, newMessage) => {
  let newArray = newMessage.concat(chatState);

  return newArray
    .sort((a, b) => {
      return new Date(b.dateUpdated) - new Date(a.dateUpdated);
    })
    .reverse();
};

export const getTimeStamp = (date) => {
  return `${new Date(date).getHours()}:${String(
    new Date(date).getMinutes()
  ).padStart(2, "0")}`;
};

export const checkNewDayMessage = (prevMessageDate, currentMessageDate) => {
  prevMessageDate = new Date(prevMessageDate);
  currentMessageDate = new Date(currentMessageDate);

  if (prevMessageDate == "Invalid Date") {
    return currentMessageDate.toDateString();
  } else if (prevMessageDate == currentMessageDate) {
    return null;
  } else if (
    prevMessageDate < currentMessageDate &&
    prevMessageDate?.toDateString() != currentMessageDate?.toDateString()
  ) {
    return currentMessageDate.toDateString();
  }
};

export const convertDateToLocaleString = (date, daysBefore) => {
  return moment(date)
    .subtract(daysBefore ?? 30, "days")
    .toLocaleString();
};

export const getContactKeyPairs = (contacts) => {
  let finalPairs = {};
  contacts.forEach((contact) => {
    finalPairs[contact.phone] = contact.name;
  });
  return finalPairs;
};
