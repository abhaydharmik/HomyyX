require("dotenv").config()
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require('cors');
const chatSocket = require("./sockets/chat.socket")

const app = express();

// Middleware
app.use(cors())
app.use(express.json())

// Register Route
const messageRoutes = require("./routes/message.routes")
app.use("/api/messages", messageRoutes)

// Create HTTP Server
const server = http.createServer(app)

// Attach Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Vite Port
        methods: ["GET", "POST"]
    }
})

chatSocket(io)

// Start server

const PORT = 5000
server.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})

// Connect MongoDB
const connectDB = require("./config/db")
connectDB()

