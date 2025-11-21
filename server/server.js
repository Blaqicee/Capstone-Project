import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import booksRoutes from "./routes/books.js";
import tasksRoutes from "./routes/tasks.js";
import chatRoutes from "./routes/chat.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Routes
app.use("/api/books", booksRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/chat", chatRoutes);

// Socket.io
io.on("connection", (socket) => {
    console.log("User connected: " + socket.id);

    socket.on("sendMessage", (msg) => {
        io.emit("receiveMessage", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
    });
});

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
