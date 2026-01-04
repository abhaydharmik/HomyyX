import React from "react";
import MessageItem from "./MessageItem";

const messages = [
  { text: "Hey Everyone..!!", self: false },
  { text: "Hi", self: true },
  { text: "How's it going?", self: true },
  { text: "Everything is fine, what's about you?", self: false },
];

const MessageList = () => {
  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-2">
      {messages.map((msg, i) => (
        <MessageItem key={i} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
