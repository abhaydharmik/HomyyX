const Message = require("../models/Message")

// Socket Connection
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Save Brodcast System
    const saveAndBroadcastSystem = async(text)=>{
      const msg = {
        type: "system",
        text,
        time: new Date().toLocaleTimeString()
      }

      try {
        await Message.create({
          username: "system",
          text: text,
          type: "system",
        })

        socket.broadcast.emit("receive_message", msg)

      } catch (err) {
        console.log("System message error:",err)
      }

    }

    //User joins with "username"
    socket.on("join_chat", async (username) => {
      if (socket.username) return;
      socket.username = username;

      await saveAndBroadcastSystem(`${username} joined the chat`)
    });

    // Send Messages
    socket.on("send_message", async (message) => {
      try {
        await Message.create({
          username: message.username,
          text: message.text,
          type: "user",
        })

        socket.broadcast.emit("receive_message", message);
      } catch (err) {
        console.error("Message save error:", err)
      }
    });

    //Typing Indicator
    socket.on("typing", ()=> {
      if(!socket.username) return

      socket.broadcast.emit("user_typing", {
        username: socket.username
      })
    })
    
    socket.on("stop_typing", ()=> {
      if(!socket.username) return

      socket.broadcast.emit("user_stop_typing")
    })

    // User Disconects
    socket.on("disconnect", async() => {
      if (!socket.username) return
        
        await saveAndBroadcastSystem(`${socket.username} left the chat`)
      

      console.log("User Disconnected:", socket.id);
    });
  });
};
