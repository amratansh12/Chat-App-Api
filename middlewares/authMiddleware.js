const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userSchema')

const protect = asyncHandler(async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1];

        const decode = jwt.decode(token, process.env.JWT_ID);

        req.user = await User.findById(decode.id).select('-password');
        next();
    }else{
        res.status(401);
        throw new Error('No authentication; Failure of token');
    }

    if(!token){
        res.status(401);
        throw new Error('No authentication; Unable to find token');
    }
})

module.exports = {protect}