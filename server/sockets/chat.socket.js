const Message = require("../models/Message");

// Socket Connection
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Save Brodcast System
    const saveAndBroadcastSystem = async (text) => {
      const msg = {
        type: "system",
        text,
        time: new Date().toLocaleTimeString(),
        room: socket.roomId,
      };

      try {
        await Message.create({
          username: "system",
          text: text,
          type: "system",
          room: socket.roomId,
        });

        socket.to(socket.roomId).emit("receive_message", msg);
      } catch (err) {
        console.log("System message error:", err);
      }
    };

    // JOIN ROOM  (group or private)
    socket.on("join_room", async ({ username, roomId }) => {
      // if (socket.username) return;
      socket.username = username;
      socket.roomId = roomId;

      socket.join(roomId);

      await saveAndBroadcastSystem(`${username} joined the chat`);
    });

    // Send Messages
    socket.on("send_message", async (message) => {
      try {
        await Message.create({
          username: message.username,
          text: message.text,
          type: "user",
          room: message.roomId,
        });

        socket.to(message.roomId).emit("receive_message", message);
      } catch (err) {
        console.error("Message save error:", err);
      }
    });

    //Typing Indicator
    socket.on("typing", () => {
      if (!socket.username || !socket.roomId) return;

      socket.to(socket.roomId).emit("user_typing", {
        username: socket.username,
      });
    });

    socket.on("stop_typing", () => {
      if (!socket.username || !socket.roomId) return;

      socket.to(socket.roomId).emit("user_stop_typing");
    });

    // User Disconects
    socket.on("disconnect", async () => {
      if (!socket.username || !socket.roomId) return;

      await saveAndBroadcastSystem(`${socket.username} left the chat`);

      console.log("User Disconnected:", socket.id);
    });
  });
};
