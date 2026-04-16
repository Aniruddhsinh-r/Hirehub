let users = [];

export const getReceiverSocketId = (userId) => {
  const user = users.find((u) => u.userId === userId);
  return user?.socketId;
};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register user with their socket
    socket.on("addUser", (userId) => {
      // Remove old entry if exists then add new
      users = users.filter((u) => u.userId !== userId);
      users.push({ userId, socketId: socket.id });

      // Broadcast online users to all clients
      io.emit("getOnlineUsers", users.map((u) => u.userId));
    });

    // Real-time message relay
    socket.on("sendMessage", ({ senderId, receiverId, text, _id, createdAt }) => {
      const receiver = users.find((u) => u.userId === receiverId);
      if (receiver) {
        io.to(receiver.socketId).emit("receiveMessage", {
          _id,
          senderId,
          receiverId,
          text,
          createdAt
        });
      }
    });

    // Cleanup on disconnect
    socket.on("disconnect", () => {
      users = users.filter((u) => u.socketId !== socket.id);
      io.emit("getOnlineUsers", users.map((u) => u.userId));
      console.log("User disconnected");
    });
  });
};

export default socketHandler;