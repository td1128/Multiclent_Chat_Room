import express from 'express';
import http from 'http';      //to attach socket io with express we need http 
import path from 'path';
import { Server } from 'socket.io';


const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server);
const users={};
app.use(express.static(path.resolve("./public")));

app.get('/', (req, res) =>{
    res.render('index.ejs');
});

io.on('connection', (socket) => {
    console.log('a new user connected',socket.id);
    socket.on('new-user-joined',name=>{
        // console.log(name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('user-message',message=>{
        // console.log(message);
        socket.broadcast.emit('message',{message:message,name:users[socket.id]});
    });
    socket.on('disconnect',()=>{
        // console.log('user disconnected');
        socket.broadcast.emit('user-disconnected',users[socket.id]);
        delete users[socket.id];
    });
});

server.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
    // console.log(`localhost:${port}`);
});