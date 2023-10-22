const asyncHandler = require("express-async-handler");
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");

const accessChat = asyncHandler(async(req, res) => {
    const {userId} = req.body;

    if(!userId){
        console.log('No userId detected in the request');
        return res.status(400);
    }

    let isSingleChat = await Chat.find({
        isGroupChat: false, //group chat should be false for a solo chat
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]
    })
    .populate('users', '-password')
    .populate('latestMessage');

    isSingleChat = await User.populate(isSingleChat, {
        path: 'latestMessage.sender',
        select: 'name profile email'
    })

    if(isSingleChat.length > 0){
        res.send(isSingleChat[0]);
    }else{
        const chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try{
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({_id: createdChat._id}).populate('users', '-password');

            res.status(200).send(FullChat)
        }catch(error){
            res.status(400);
            throw new Error(error.message);
        }
    }
})

const fetchChats = asyncHandler(async (req, res) => {
    try{
        let allChats = await Chat.find({users:{$elemMatch:{$eq: req.user._id}}})
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('latestMessage')
        .sort({updatedAt: -1})

        allChats = await User.populate(allChats, {
            path: 'latestMessage.sender',
            select: 'name profile email'
        })
        res.send(allChats);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
})

const createGroupChat = asyncHandler(async (req, res) => {

    if(!req.body.users || !req.body.name){
    return res.status(400).send('Plese select users');
    }

    const users = JSON.parse(req.body.users);

    if(users.length < 2){
        return res.status(400).send('Select atleast 2 users.');
    }

    users.push(req.user);

    try{
        const groupChat =await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        })

        const fetchGroupChat = await Chat.findOne({_id: groupChat._id}).populate('users', '-password').populate('groupAdmin', '-password');

        res.status(200).send(fetchGroupChat);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
})

const renameGroupChat = asyncHandler(async (req, res) => {
    const{chatId, chatName} = req.body;
    
    const updatedChat = await Chat.findByIdAndUpdate({_id: chatId},{chatName},{new: true}).populate('users', '-password').populate('groupAdmin', '-password');

    if(!updatedChat){
        res.status(404);
        throw new Error('Chat not found');
    }else{
        res.status(200).json(updatedChat)
    }
})

const addToGroupChat = asyncHandler(async (req, res) => {
    const{chatId, userId} = req.body;

    const added = await Chat.findByIdAndUpdate({_id:chatId},{$push:{users: userId}},{new:true}).populate('users', '-password').populate('groupAdmin', '-password');

    if(!added){
        res.status(404);
        throw new Error('Chat not found');
    }else{
        res.status(200).send(added);
    }
})

const removeFromGroupChat = asyncHandler(async (req, res) => {
    const{chatId, userId} = req.body;

    const removed = await Chat.findByIdAndUpdate({_id:chatId},{$pull:{users: userId}},{new:true}).populate('users', '-password').populate('groupAdmin', '-password');

    if(!removed){
        res.status(404);
        throw new Error('User not found');
    }else{
        res.status(200).send(removed);
    }
})

module.exports = {accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroupChat, removeFromGroupChat};