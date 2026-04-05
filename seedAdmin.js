const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('./models/User')

require('dotenv').config()

const createAdmin = async () => {
    await mongoose.connect(process.env.MONGO_URI)

    const hashedPassword = await bcrypt.hash('admin123', 10)

    await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
    })

    console.log('Admin created')
}

createAdmin()