const mongoose = require('mongoose')

const User = require('./User')

const roleRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    requestedRole: {
        type: String,
        enum: ['analyst'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    reason: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('RoleRequest', roleRequestSchema)