const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const authenticationToken = authMiddleware.authenticationToken
const role = authMiddleware.roleVerification

// Request Role Change
router.post('/', authenticationToken, role('viewer'), userController.requetsRole)

// Admin check All Requests
router.get('/', authenticationToken, role('admin'), userController.getAllRequests)

// Admin approve/reject
router.patch('/role/:id', authenticationToken, role('admin'), userController.handleRequest)

module.exports = router