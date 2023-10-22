const asyncHandler = require("express-async-handler");
const Message = require('../models/messageSchema');
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");

const sendMesaage = asyncHandler(async (req, res) => {
    const {content, chatId} = req.body;

    if(!content || !chatId){
        console.log('Invalid data requested');
        return res.sendStatus(400);
    } 

    try{
        let message = await Message.create({
            sender: req.user._id,
            content: content,
            chat: chatId
        });

        message = await message.populate("sender", "name profile");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name profile email'
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        })

        res.json(message);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
})

const allMessages = asyncHandler(async (req, res) => {
    try{
        const messages = await Message.find({
            chat: req.params.chatId
        })
        .populate("sender", "name profile email")
        .populate("chat");

        res.json(messages);
    }catch(e){
        res.status(400)
        throw new Error(e.message)
    }
})

module.exports = {sendMesaage, allMessages}