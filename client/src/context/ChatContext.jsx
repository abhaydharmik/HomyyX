import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchMessages } from "../services/api";

const ChatContext = createContext();

const USERNAME_KEY = "homyyx_username";

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [typingUser, setTypingUser] = useState("");
  const [room, setRoom] = useState("general")

  //Load Username
  useEffect(() => {
    const storedUser = localStorage.getItem(USERNAME_KEY);

    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  // Load Old Messsages(DB)
  useEffect(() => {
    if (!username) return;

    const loadMessages = async () => {
      try {
        const data = await fetchMessages(room);
        setMessages(
          data.map((msg) => ({
            text: msg.text,
            username: msg.username,
            type: msg.type,
            time: new Date(msg.createdAt).toLocaleTimeString(),
            self: msg.username === username,
          }))
        );
      } catch (error) {
        console.log("Failed to load messages:", error);
      }
    };

    loadMessages();
  }, [room, username]);

  const addMessage = (message) => {
    setMessages((prev) => {
      //prevent duplicate system messages
      if (
        message.type === "system" &&
        prev.length > 0 &&
        prev[prev.length - 1].type === "system" &&
        prev[prev.length - 1].text === message.text
      ) {
        return prev;
      }

      return [...prev, message];
    });
  };

  const saveUsername = (name) => {
    setUsername(name);
    localStorage.setItem(USERNAME_KEY, name);
  };

  const clearUsername = () => {
    setUsername("");
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
