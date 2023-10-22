const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    profile:{
        type: String,
        default: "https://i.pinimg.com/736x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"
    }
}, {timestamps:true})

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function(next){
    if(!this.isModified){
        next();
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
})

const User = mongoose.model("User", userSchema);

module.exports = User;