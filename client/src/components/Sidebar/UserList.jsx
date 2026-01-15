import React from "react";
import UserItem from "./UserItem";
import { useChat } from "../../context/ChatContext";

const groups = ["general", "friends", "college", "college", "college", "college", "college"];
const users = ["Roronoa Zoro", "Briann", "Will", "Max"];

const UserList = () => {
  const { username } = useChat();

  const getPrivateRoom = (friend) => {
    return [username, friend].sort().join("_");
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          HommyX
        </h2>
        <p className="text-sm text-gray-500">Friend's Group</p>
      </div>

      <div className="h-[88.8vh] overflow-y-auto px-2 py-3 space-y-2 sidebar-scrollbar">
        <p className="text-xs uppercase text-gray-400 tracking-wider px-2 mt-2 mb-2">
          Friends
        </p>

        {users.map((users, id) => (
          <UserItem
            key={id}
            name={users}
            roomId={getPrivateRoom(users)}
            type="user"
          />
        ))}

        <p className="text-xs uppercase text-gray-400 tracking-wider px-2 mt-6 mb-2">
          Groups
        </p>

        {groups.map((groups, id) => (
          <UserItem
            key={id}
            name={groups}
            roomId={getPrivateRoom(groups)}
            type="user"
          />
        ))}

        
      </div>
    </div>
  );
};

export default UserList;
