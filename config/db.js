const mongoose = require('mongoose')

async function connectDB(){
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true
        })
        console.log(`Mongoose succesfully connected: ${connect.connection.host}`)
    }catch(error){
        console.log(error.message);
    }
}

module.exports = connectDB;