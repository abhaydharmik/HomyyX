import React from "react";
import MessageItem from "./MessageItem";
import { useChat } from "../../context/ChatContext";

const MessageList = () => {
  const { messages } = useChat();

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-2">
      {messages.length === 0 ? (
        <p className="text-center text-gray-400">No messages yet</p>
      ) : (
        messages.map((msg, i) => <MessageItem key={i} message={msg} />)
      )}
    </div>
  );
};

export default MessageList;
