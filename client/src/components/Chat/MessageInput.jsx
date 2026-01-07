import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";

const MessageInput = () => {
  const [text, setText] = useState("")
  const {addMessage} =  useChat()

  const handleSend = () => {
    if(!text.trim()) return

    addMessage({text, self: true})
    setText("")
  }

  return (
    <div className="p-3  border-t dark:border-gray-700 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e)=> {setText(e.target.value)}}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full border dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none"
      />
      <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">Send</button>
    </div>
  );
};

export default MessageInput;
