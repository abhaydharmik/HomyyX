import React from "react";

const UserItem = ({ name }) => {
  return (
    <div className="flex items-center gap-4 mb-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
      <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
        {name?.charAt(0)}
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium dark:text-white">{name}</p>
        <span className="text-xs text-green-500">Online</span>
      </div>
    </div>
  );
};

export default UserItem;
