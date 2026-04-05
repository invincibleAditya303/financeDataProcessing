const { request } = require('express')
const RoleRequest = require('../models/RoleRequest')
const User = require('../models/User')

// Role change Request
exports.requetsRole = async (request, response) => {
    try {
        const {requetsRole, reason} = request.body

        const requestAccess = await RoleRequest.create({
            user: request.user.id,
            requetsRole,
            reason
        })

        return response.status(200).json({message: 'Request sent successfully', data: requestAccess})
    } catch (e) {
        return response.status(500).json({message: 'Serevr Error'})
    }
}

// Get role requests
exports.getAllRequests = async (request, response) => {
    try {
        const requests = await RoleRequest.find()
            .populate('user', 'name email role')

        return response.status(200).json({message: requests})
    } catch (e) {
        return response.status(500).json({message: 'Server Erroe'})
    }
}

// Handle role requests
exports.handleRequest = async (request, response) => {
    try {
        const {status} = request.body

        const getRequest = await RoleRequest.findById(request.user.id)

        if (!getRequest) {
            return response.status(404).json({message: 'Not found'})
        }

        getRequest.status = status
        await getRequest.save()

        if (status === 'approved') {
            await User.findByIdAndUpdate(request.user, {
                role: getRequest.requestedRole
            })
        }

        return response.status(400).json({message: 'Request proccessed', request})
    } catch (e) {
        return request.status(500).json({message: 'Server Error'})
    }
}