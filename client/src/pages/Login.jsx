import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";

const Login = () => {
  const [name, setName] = useState("");
  const { saveUsername } = useChat();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name.trim()) return;
    saveUsername(name.trim());
    navigate("/chat");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg w-80">
        <h2 className="text-xl text-white mb-4 text-center">
          Enter your name
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-3 py-2 rounded bg-gray-700 text-white mb-4 outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-500 rounded text-white"
        >
          Enter Chat
        </button>
      </div>
    </div>
  );
};

export default Login;
