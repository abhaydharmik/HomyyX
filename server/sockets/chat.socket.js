// Socket Connection
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Receive msg from client
    socket.on("send_message", (message) => {
      console.log("Message Receive:", message);

      //Send msg to all other
      socket.broadcast.emit("receive_message", message);

      socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);
      });
    });
  });
};
