import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchMessages } from "../services/api";

const ChatContext = createContext();
const USERNAME_KEY = "homyyx_username";

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [room, setRoom] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  /* 🔐 Load username */
  useEffect(() => {
    const storedUser = localStorage.getItem(USERNAME_KEY);
    if (storedUser) setUsername(storedUser);
  }, []);

  /* 🔥 Clear messages when switching rooms */
  useEffect(() => {
    setMessages([]);
  }, [room]);

  /* 📥 Load messages from DB (room-based) */
  useEffect(() => {
    if (!username || !room) return;

    const loadMessages = async () => {
      try {
        const data = await fetchMessages(room);
        setMessages(
          data.map((msg) => ({
            text: msg.text,
            username: msg.username,
            type: msg.type,
            actor: msg.actor, // 🔥 IMPORTANT
            time: new Date(msg.createdAt).toLocaleTimeString(),
            self: msg.username === username,
            roomId: room,
          }))
        );
      } catch (error) {
        console.log("Failed to load messages:", error);
      }
    };

    loadMessages();
  }, [room, username]);

  /* ➕ Add message (SOCKET SAFE) */
  const addMessage = (message) => {
    setMessages((prev) => {
      // 🔥 Ignore system messages triggered by self
      if (
        message.type === "system" &&
        message.actor === username
      ) {
        return prev;
      }

      // 🔁 Prevent duplicate system messages (socket + DB)
      if (
        message.type === "system" &&
        prev.some(
          (m) =>
            m.type === "system" &&
            m.text === message.text &&
            m.actor === message.actor
        )
      ) {
        return prev;
      }

      return [...prev, message];
    });
  };

  /* 💾 Save username */
  const saveUsername = (name) => {
    setUsername(name);
    localStorage.setItem(USERNAME_KEY, name);
  };

  /* 🚪 Logout / Clear state */
  const clearUsername = () => {
    setUsername("");
    setRoom(null);
    setMessages([]);
    localStorage.removeItem(USERNAME_KEY);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        username,
        saveUsername,
        clearUsername,
        typingUser,
        setTypingUser,
        room,
        setRoom,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
