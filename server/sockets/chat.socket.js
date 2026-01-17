const Message = require("../models/Message");

// socket.id -> username
const onlineUsers = new Map();
// socket.id -> Set of rooms already joined
const joinedRooms = new Map();

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    /* USER ONLINE */
    socket.on("user_online", (username) => {
      socket.username = username;
      onlineUsers.set(socket.id, username);
      io.emit("online_users", [...new Set(onlineUsers.values())]);
    });

    /* JOIN ROOM (SAFE, NO DUPLICATES) */
    socket.on("join_room", async ({ username, roomId }) => {
      socket.join(roomId);

      // 🔒 track joined rooms per socket
      if (!joinedRooms.has(socket.id)) {
        joinedRooms.set(socket.id, new Set());
      }

      // 🔥 IF USER ALREADY JOINED THIS ROOM → STOP
      if (joinedRooms.get(socket.id).has(roomId)) {
        return;
      }

      joinedRooms.get(socket.id).add(roomId);

      const systemMessage = {
        type: "system",
        text: `${username} joined the chat`,
        time: new Date().toLocaleTimeString(),
        roomId,
        actor: username,
      };

      await Message.create({
        username: "system",
        text: systemMessage.text,
        type: "system",
        room: roomId,
        actor: username,
      });

      // send ONLY to others
      socket.to(roomId).emit("receive_message", systemMessage);
    });

    /* SEND MESSAGE */
    socket.on("send_message", async (message) => {
      await Message.create({
        username: message.username,
        text: message.text,
        type: "user",
        room: message.roomId,
      });

      socket.to(message.roomId).emit("receive_message", message);
    });

    /* TYPING */
    socket.on("typing", ({ roomId }) => {
      if (!roomId || !socket.username) return;
      socket.to(roomId).emit("user_typing", { username: socket.username });
    });

    socket.on("stop_typing", ({ roomId }) => {
      if (!roomId) return;
      socket.to(roomId).emit("user_stop_typing");
    });

    /* DISCONNECT */
    socket.on("disconnect", () => {
      onlineUsers.delete(socket.id);
      joinedRooms.delete(socket.id);
      io.emit("online_users", [...new Set(onlineUsers.values())]);
      console.log("User Disconnected:", socket.id);
    });
  });
};
