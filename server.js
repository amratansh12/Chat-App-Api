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

app.listen(PORT, console.log(`server is successfuly running on port ${PORT}`));