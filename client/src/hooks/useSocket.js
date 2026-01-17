import { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { socket } from "../services/socket";

const useSocket = () => {
  const {
    addMessage,
    username,
    setTypingUser,
    room,
    setOnlineUsers,
    setLastMessages,
  } = useChat();

  const connectedRef = useRef(false);
  const currentRoomRef = useRef(null);

  /* 🔌 CONNECT SOCKET ONCE */
  useEffect(() => {
    if (!username || connectedRef.current) return;

    socket.connect();
    connectedRef.current = true;

    socket.emit("user_online", username);

    socket.off("online_users");
    socket.off("receive_message");
    socket.off("user_typing");
    socket.off("user_stop_typing");

    socket.on("online_users", setOnlineUsers);

    socket.on("receive_message", (message) => {
      addMessage({ ...message, self: false });

      setLastMessages((prev) => ({
        ...prev,
        [message.roomId]: {
          text: message.text,
          lastText: message.text,
          sender: message.username,
          isTyping: false,
        },
      }));
    });

    socket.on("user_typing", ({ username, roomId }) => {
      setTypingUser(username);

      setLastMessages((prev) => ({
        ...prev,
        [roomId]: {
          ...prev[roomId],
          text: "Typing...",
          isTyping: true,
        },
      }));
    });

    socket.on("user_stop_typing", ({ roomId }) => {
      setTypingUser("");

      setLastMessages((prev) => {
        if (!prev[roomId]) return prev;

        return {
          ...prev,
          [roomId]: {
            ...prev[roomId],
            text: prev[roomId].lastText || "No messages yet",
            isTyping: false,
          },
        };
      });
    });
  }, [username]);

  /* 🚪 JOIN / SWITCH ROOM (FIXED) */
  useEffect(() => {
    if (!room || !username) return;

    // 🔒 PREVENT JOINING SAME ROOM TWICE
    if (currentRoomRef.current === room) return;

    // leave previous room
    if (currentRoomRef.current) {
      socket.emit("leave_room", currentRoomRef.current);
    }

    socket.emit("join_room", {
      username,
      roomId: room,
    });

    currentRoomRef.current = room;
  }, [room, username]);

  /* ❌ DISCONNECT ONLY ON UNMOUNT */
  useEffect(() => {
    return () => {
      socket.disconnect();
      connectedRef.current = false;
    };
  }, []);
};

export default useSocket;
