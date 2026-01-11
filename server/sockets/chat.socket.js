// Socket Connection
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    //User joins with username
    socket.on("join_chat", (username) => {
      if (socket.username) return;
      socket.username = username;

      socket.broadcast.emit("receive_message", {
        type: "system",
        text: `${username} joined the chat`,
        time: new Date().toLocaleTimeString(),
      });
    });

    // Receives Normal Messages
    socket.on("send_message", (message) => {
      socket.broadcast.emit("receive_message", message);
    });

    // User Disconects
    socket.on("disconnect", () => {
      if (socket.username) {
        
        socket.broadcast.emit("receive_message", {
          type: "system",
          text: `${username} joined the chat`,
          time: new Date().toLocaleTimeString(),
        });
      }

      console.log("User Disconnected:", socket.id);
    });
  });
};
