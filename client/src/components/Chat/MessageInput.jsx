import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { socket } from "../../services/socket";

let typingTimeout;

const MessageInput = () => {
  const [text, setText] = useState("");
  const { addMessage, username, room } = useChat();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // stop new line
      handleSend();
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (!room) return;

    socket.emit("typing", { roomId: room });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stop_typing", { roomId: room });
    }, 800);
  };

  const handleSend = () => {
    if (!text.trim() || !room) return;

    const message = {
      text,
      username,
      roomId: room,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", message);
    socket.emit("stop_typing", { roomId: room });

    addMessage({ ...message, self: true });
    setText("");
  };

  return (
    <div className="p-3 border-t border-gray-700 flex gap-2">
      <input
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full border dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white rounded-full"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
