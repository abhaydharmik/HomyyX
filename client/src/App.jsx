import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { useChat } from "./context/ChatContext";

const App = () => {
  const { username } = useChat();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/chat"
        element={username ? <Chat /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
