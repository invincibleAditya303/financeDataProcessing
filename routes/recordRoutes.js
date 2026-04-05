const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const recordController = require('../controllers/recordController')

const authenticationToken = authMiddleware.authenticationToken

// Create Record
router.post('/create-record', authenticationToken, recordController.createRecord)

// Get all Records
router.get('/', authenticationToken, recordController.getRecords)

// Get Record by Id
router.get('/:id', authenticationToken, recordController.getRecordById)

// Update Record
router.patch('/:id', authenticationToken, recordController.updateRecord)

// Delete Record
router.delete('/:id', authenticationToken, recordController.deleteRecord)

module.exports = router