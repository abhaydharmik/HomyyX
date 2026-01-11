import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";
const Login = () => {
  const [name, setName] = useState("");
  const { saveUsername } = useChat();
  const navigate = useNavigate();

  const handleEnter = () => {
    if (!name.trim()) return;
    saveUsername(name);
    navigate("/chat");
  };


  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-5xl font-bold mb-2 text-blue-600">HomyyX</h1>
      <p className="mb-4 text-gray-500">Chat Together. Stay Close.</p>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="px-4 py-2 rounded border mb-4 w-64 dark:bg-gray-800 dark:text-white"
      />

      <button onClick={handleEnter}
      className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Enter Chat</button>
    </div>
  );
};

export default Login;
