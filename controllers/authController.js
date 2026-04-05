const User = require('../models/User')

const express = require('express')
const app = express()
app.use(express.json())

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = user => {
    const payload = {
        id: user._id,
        role: user.role
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})
}

exports.register = async (request, response) => {
    try {
        const {name, email, password} = request.body

        const isExistingUser = await User.findOne({email})

        if (isExistingUser) {
            return response.status(400).json({message: 'User already exists'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'viewer',
            isActive: true
        })

        await user.save()
        return response.status(201).json({message: 'User created successfully'})
    } catch (e) {
        console.log('Error while registration', e)
        return response.status(500).json({message: 'Server Error'})
    }

}

exports.login = async (request, response) => {
    try {
        const {email, password} = request.body

        const user = await User.findOne({email})

        if (!user) {
            return response.status(401).json({message: 'Invalid user'})
        }

        isPasswordMatched = await bcrypt.compare(password, user.password)

        if (isPasswordMatched) {
            const token = generateToken(user)
            return response.status(200).json({token})
        } else {
            return response.status(401).json({message: 'Invalid password'})
        }
    } catch (e) {
        console.log('Login eeror', e)
        return response.status(500).json({message: 'Server Error'})
    }
}