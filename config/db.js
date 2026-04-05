const mongoose = require('mongoose')
require('dotenv').config()

// Connecting to the Server
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch (e) {
        console.log('Connection error', e)
    }
}

module.exports = connectDB