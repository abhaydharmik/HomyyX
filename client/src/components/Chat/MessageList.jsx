import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { useChat } from "../../context/ChatContext";

const MessageList = () => {
  const { messages } = useChat();
  const bottomRef = useRef(null);

  // 🔽 Auto scroll
  useEffect(() => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages]);

  // 🔥 Show only last 5 system messages
  const systemMessages = messages
    .filter((m) => m.type === "system")
    .slice(-5);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-2">
      {messages.length === 0 ? (
        <p className="text-center text-gray-400">No messages yet</p>
      ) : (
        messages.map((msg) => {
          if (
            msg.type === "system" &&
            !systemMessages.some(
              (s) => s.text === msg.text && s.time === msg.time
            )
          ) {
            return null;
          }

          return (
            <MessageItem
              key={`${msg.time}-${msg.username}-${msg.text}`}
              message={msg}
            />
          );
        })
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
