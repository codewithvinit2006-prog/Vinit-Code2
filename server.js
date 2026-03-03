// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

    socket.on("join", (username) => {
        socket.username = username;
        io.emit("update", username + " joined the chat");
    });

    socket.on("chat", (data) => {
        io.emit("chat", {
            username: socket.username,
            message: data
        });
    });

    socket.on("disconnect", () => {
        if(socket.username){
            io.emit("update", socket.username + " left the chat");
        }
    });

});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});