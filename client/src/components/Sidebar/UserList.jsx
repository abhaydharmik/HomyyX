import React from "react";
import UserItem from "./UserItem";

const UserList = () => {
  const users = ["Roronoa Zoro", "Briann", "Will", "Max"];

  return (
    <aside className="h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">HommyX</h2>
        <p className="text-sm text-gray-500">Friend's Group</p>
      </div>

      <div className="p-2">
        {users.map((user, id) => (
          <UserItem key={id} name={user} />
        ))}
      </div>
      
    </aside>
  );
};

export default UserList;
