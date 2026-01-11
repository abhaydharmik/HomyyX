const MessageItem = ({ message }) => {
  console.log(message)
  return (
    <div className={`flex ${message.self ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs ${
          message.self
            ? "bg-blue-500 text-white"
            : "bg-white dark:bg-gray-800 dark:text-white"
        }`}
      >
        {!message.self && (
          <p className="text-xs font-semibold mb-1">
            {message.username || "unknown"}
          </p>
        )}

        <p className="text-sm">{message.text}</p>
        <span className="text-[10px] opacity-60">{message.time}</span>
      </div>
    </div>
  );
};

export default MessageItem;
