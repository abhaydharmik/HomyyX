import React from "react";

const MessageItem = ({ message }) => {
  return (
    <div className={`flex ${message.self ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
          message.self
            ? "bg-blue-500 text-white"
            : "bg-white dark:bg-gray-800 dark:text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageItem;
