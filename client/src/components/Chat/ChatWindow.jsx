import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "../../context/ChatContext";

const ChatWindow = () => {
  const { typingUser, room } = useChat();

  // No room selected
  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-400">
        Select a user or group to start chatting
      </div>
    );
  }

  const isGroup = !room.includes("_");
  const chatTitle = isGroup
    ? `# ${room}`
    : room.replace("_", " & ");

  return (
    <div className="h-screen flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
      
      {/* Chat Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="font-semibold dark:text-white capitalize">
          {chatTitle}
        </h3>
        <p className="text-xs text-gray-500">
          {isGroup ? "Group chat" : "Private chat"}
        </p>
      </div>

      {/* Messages */}
      <MessageList />

      {/* Typing Indicator */}
      {typingUser && (
        <div className="px-4 pb-1 text-xs italic text-gray-500">
          {typingUser} is typing…
        </div>
      )}

      {/* Input */}
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
