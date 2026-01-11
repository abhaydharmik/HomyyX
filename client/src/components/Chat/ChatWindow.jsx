import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "../../context/ChatContext";

const ChatWindow = () => {

  const {typingUser} = useChat()

  return (
    <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="font-semibold dark:text-white">HommyX Group</h3>
        <p className="text-xs text-gray-500">4 members online</p>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Typing Indicator */}
      {typingUser && (
        <p className="px-4 py-4 text-sm italic text-gray-500">{typingUser} is typing....</p>
      )}

      {/* Input */}
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
