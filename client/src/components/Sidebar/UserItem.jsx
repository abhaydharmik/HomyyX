import React from "react";
import { useChat } from "../../context/ChatContext";
import { socket } from "../../services/socket";

const UserItem = ({ name, roomId, type }) => {
  const { room, setRoom, username } = useChat();
  const isActive = room === roomId;

  const initials = name.charAt(0).toUpperCase();

  const handleClick = () => {
    setRoom(roomId);

    // 🔥 Join room ONLY when clicked
    socket.emit("join_room", {
      username,
      roomId,
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-50 hover:text-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
        }`}
    >
      {/* Avatar */}
      <div className="relative">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
            ${
              type === "group"
                ? "bg-gray-700 text-blue-400"
                : "bg-blue-500 text-white"
            }
          `}
        >
          {type === "group" ? "#" : initials}
        </div>

        {/* Online dot only for users */}
        {type === "user" && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        {type === "user" && (
          <p className="text-xs text-green-500">Online</p>
        )}
      </div>
    </div>
  );
};

export default UserItem;
