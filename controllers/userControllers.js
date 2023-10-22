const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler"); //automatically handle the errors 
const { log } = require('mathjs');

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_ID, {expiresIn: "1d"})
}

// For the registering of the user
const registerUser = asyncHandler(async(req, res) => {  
    const {name, email, password, profile} = req.body;

    if(!name || !email || !password){
        res.status(401);
        throw new Error('Enter valid name, email or password');
    }

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400).json('User already exists');
        throw new Error('User already exists');
    }

    const newUser = await User.create({
        name,
        email,
        password,
        profile
    })
    
    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            profile: newUser.profile,
            token: generateToken(newUser._id)
        })
    }else{
        res.status(400);
        throw new Error('Failed to create user');
    }
})

// For the signing in of the user
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profile: user.profile,
            token: generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

// our endpoint is /api/user?search=name
const fetchAllUsers = asyncHandler(async(req, res) => {
    const keywords = req.query.search ? {
        $or: [
            {name: {$regex: req.query.search, $options: 'i'}},
            {email: {$regex: req.query.search, $options: 'i'}}
        ]
    } : {}

    const users = await User.find(keywords).find({_id: {$ne: req.user._id}});
    res.send(users);
})

module.exports = {
    registerUser,
    loginUser,
    fetchAllUsers
}