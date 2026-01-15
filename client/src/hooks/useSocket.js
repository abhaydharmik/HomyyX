import { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { socket } from "../services/socket";

const useSocket = () => {
  const { addMessage, username, setTypingUser, room } = useChat();
  const joinedRef = useRef(false);

  useEffect(() => {
    if (!username || !room || joinedRef.current) return;

    joinedRef.current = true;

    //connect socket
    socket.connect();

    // Notify server user joined
    socket.emit("join_room", { username, roomId: room });

    // socket.on("receive_message", (message) => {
    //   addMessage({ ...message, self: false });
    // });

    socket.off("receive_message")
    socket.off("user_typing")
    socket.off("user_stop_typing")
    
    
    socket.on("receive_message", (message) => {
      // console.log("Socket Message Received:", message)
      addMessage({ ...message, self: false });
    });
    

    socket.on("user_typing", ({ username }) => {
      setTypingUser(username);
    });

    socket.on("user_stop_typing", () => {
      setTypingUser("");
    });

      joinedRef.current = false
  }, [username, room]);

  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  }, [])
  
};

export default useSocket;
