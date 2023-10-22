const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    chatName: { //Name of the Chat
        type: String,
        trim: true
    },
    isGroupChat: { //Is it a group or not?
        type: Boolean,
        default: false
    },
    users:[{ //users participating if it is a group chat?
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    latestMessage: { //latest message received from the user
        type:mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    groupAdmin: { //admin for the group
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }   
}, {timestamps: true})

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;