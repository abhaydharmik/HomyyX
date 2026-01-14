import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import { useChat } from "../../context/ChatContext";

const MessageList = () => {
  const { messages } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const systemMessages = messages.filter((m) => m.type === "system").slice(-5);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-2">
      {messages.length === 0 ? (
        <p className="text-center text-gray-400">No messages yet</p>
      ) : (
        messages.map((msg, i) => {
          if (msg.type === "system" && !systemMessages.includes(msg)) {
            return null;
          }

          return <MessageItem key={i} message={msg} />;
        })
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
