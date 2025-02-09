import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config(); 

const users = [{}];
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());

io.on("connection",(socket)=>{
    console.log("New CConnection...")

    // every socket has its id...

    socket.on("joined",({userName})=>{

        users[socket.id] = userName;
        socket.broadcast.emit("userJoined",({user : "AloneBoy",message : `${users[socket.id]}  Joined the chat`}))
        // instead of who has joined visible to all others

        socket.emit("welcome",{user : "Admin" , message : ` Welcome to WeChat ${users[socket.id]}`});
        // only visible to who is sending the data

    })
    // on means reciving the data here

    socket.on("message",({message,id})=>{
        io.emit("sendMessage",{user : users[id] , message , id})
    })

  socket.on("disconect",()=>{
    socket.broadcast.emit("leave",({user : "AloneBoy", message: `${users[socket.id]} has left the chat...`}))
    console.log("User Left")
  })

 


})
// io is a whole circuit and socket are the users...

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

app.get("/",(req,res)=>{
    res.send("Chat Application")
})