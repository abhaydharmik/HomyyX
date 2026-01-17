import React from "react";
import UserItem from "./UserItem";
import { useChat } from "../../context/ChatContext";

const groups = ["general", "friends", "college"];

const UserList = () => {
  const { username, onlineUsers } = useChat();

  // Remove yourself from online users
  const users = onlineUsers.filter((user) => user !== username);

  const getPrivateRoom = (friend) => {
    return [username, friend].sort().join("_");
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-r dark:border-gray-700 w-72">
      
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          HommyX
        </h2>
        <p className="text-sm text-gray-500">Friend&apos;s Group</p>
      </div>

      {/* Scroll Area */}
      <div className="h-[88.8vh] overflow-y-auto px-2 py-3 space-y-2 sidebar-scrollbar">
        
        {/* Friends */}
        <p className="text-xs uppercase text-gray-400 tracking-wider px-2 mt-4 mb-2">
          Friends
        </p>

        {users.length === 0 && (
          <p className="text-xs text-gray-400 px-2">
            No users online
          </p>
        )}

        {users.map((user) => (
          <UserItem
            key={user}
            name={user}
            roomId={getPrivateRoom(user)}
            type="user"
          />
        ))}

        {/* Groups */}
        <p className="text-xs uppercase text-gray-400 tracking-wider px-2 mt-6 mb-2">
          Groups
        </p>

        {groups.map((group) => (
          <UserItem
            key={group}
            name={group}
            roomId={group}   // ✅ group room
            type="group"     // ✅ correct type
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
