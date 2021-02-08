const { Server } = require('socket.io');
const io = new Server();

io.on("connection", function (socket) {
    console.log("A user connected");
});

exports.io = io;