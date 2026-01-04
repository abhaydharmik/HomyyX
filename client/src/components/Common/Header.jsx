import React, { useEffect, useState } from "react";

const Header = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    console.log("Btn Clicked");
  }, [dark]);

  return (
    <div className="flex justify-end p-2 border-b bg-gray-800 dark:border-gray-800">
      <button
        onClick={() => setDark(!dark)}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
      >
        {dark ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default Header;
