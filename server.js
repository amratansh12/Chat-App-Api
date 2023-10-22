const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
// const chats = require('./data')
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('App is running on port 5000');
})

app.use('/api/user', userRoutes);

app.use('/api/chat', chatRoutes);

app.use('/api/message', messageRoutes);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`server is successfuly running on port ${PORT}`));

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket) => {
    console.log("connected to socket.io");

    socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log(userData._id)
        socket.emit('connected');
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('User joined room: ' + room);
    })

    socket.on('new message', (newMessageReceived) => {
        var chat = newMessageReceived.chat;

        if(!chat.users) return console.log('chat.users not defined');
        chat.users.forEach(user => {
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit('message received', newMessageReceived)
        })
    })

    socket.off('setup', (userData) => {
        console.log("User disconnected");
        socket.leave(userData._id)
    })
})

