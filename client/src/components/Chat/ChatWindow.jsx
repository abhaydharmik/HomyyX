import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="font-semibold dark:text-white">HommyX Group</h3>
        <p className="text-xs text-gray-500">4 members online</p>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Input */}
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
