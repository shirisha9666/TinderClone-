import { Server } from "socket.io";


let io;
const connectedUsers = new Map();
export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

io.use((socket,next)=>{
    const userId=socket.handshake.auth.userId;
    if(!userId)return next(new Error("Invalid User Id"))
        socket.userId=userId
    next();
})


  io.on("connection", (socket) => {
    console.log(`User connected with socket io :${socket.id}`);
    connectedUsers.set(socket.userId, socket.id);

    socket.on("disconnect", () => {
      console.log(`User disconnect with socket id : ${socket.id}`);
      connectedUsers.delete(socket.userId);
    });
  });
};

export const getIo=()=>{
    if(!io){
        throw new Error("socket.io not initilized")
    }
    return io
}
export const getConnectedUsers=()=>connectedUsers;