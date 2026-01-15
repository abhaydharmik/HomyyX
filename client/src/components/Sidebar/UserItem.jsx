import React from "react";
import { useChat } from "../../context/ChatContext";

const UserItem = ({ name, roomId, type }) => {
  const { room, setRoom } = useChat();
  const isActive = room === roomId;

  // Avatar
  const initials = name.charAt(0).toUpperCase();
  return (
    <div
      onClick={() => setRoom(roomId)}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer  text-gray-300 transition ${
        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-50 hover:text-gray-800"
      }`}
    >
      {/* Avatar */}
      <div className="relative">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold 
        ${
          type === "groups"
            ? "bg-gray-700 text-blue-400"
            : "bg-blue-500 text-white"
        }`}
        >
          {type === "groups" ? "#" : initials}
        </div>

        {/* Online dot only for users */}
        {type === "users" && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full" />
        )}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-sm font-medium">{name}</p>
        {type === "users" && <p className="text-xs text-green-400">Online</p>}
      </div>
    </div>
  );
};

export default UserItem;
