const express = require('express')
const router = express.Router()

const dashboardController = require('../controllers/dashboardController')
const authMiddleware = require('../middleware/authMiddleware')

const authenticationToken = authMiddleware.authenticationToken
const role = authMiddleware.roleVerification

// View Summary
router.get('/summary', authenticationToken, role('viewer', 'analyst', 'admin'), dashboardController.getSummary)

// View category breakdown
router.get('/category', authenticationToken, role('analyst', 'admin'), dashboardController.getCategoryBreakdown)

// View monthly trends
router.get('/trends', authenticationToken, role('analyst', 'admin'), dashboardController.getMonthlyTrends)

//View Income vs Expense
router.get('/income-expense', authenticationToken, role('analyst', 'viewer'), dashboardController.getIncomeExpense)

// View recent records
router.get('/recent', authenticationToken, role('analyst', 'admin'), dashboardController.getRecentRecords)

module.exports = router