import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar/UserList";
import ChatWindow from "../components/Chat/ChatWindow";
import useSocket from "../hooks/useSocket";
import { useChat } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { username } = useChat();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) navigate("/");
  }, [username]);

  useSocket();

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;
