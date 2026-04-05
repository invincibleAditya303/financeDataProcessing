const { request } = require('express')
const Record = require('../models/Record')

// Summary (Income, Expense, Balance)
exports.getSummary = async (request, response) => {
    try {
        const {from, to} = request.query

        const match = {}

        if (from && to) {
            match.date = {
                $gte: new Date(from),
                $lte: new Date(to)
            }
        }

        const data = await Record.aggregate([
            {$match: match},
            {
                $group: {
                    _id: '$type',
                    total: {$sum: '$amount'}
                }
            }
        ])

        let income = 0, expense = 0

        data.forEach(item => {
            if (item._id === 'income') income = item.total
            if (item._id === 'expense') expense = item.total
        })

        return response.status(200).json({income, expense, netBalance: income-expense})
    } catch (e) {
        return response.status(500).json({message: 'Server Error'})
    }
}

// Category Breakdown
exports.getCategoryBreakdown = async (request, response) => {
    try {
        const data = await Record.aggregate([
            {
                $group: {
                    _id: '$category',
                    total: {$sum: '$amount'}
                }
            }
        ])

        return response.status(200).json({message: data})
    } catch (e) {
        return response.status(500).json({message: 'Server Error'})
    }
}

// Monthly trends
exports.getMonthlyTrends = async (request, response) => {
    try {
        const data = await Record.aggregate([
            {
                $group: {
                    _id: {
                        year: {$year: '$date'},
                        month: {$month: '$date'}
                    },
                    total: {$sum: '$amount'}
                }
            },
            {$sort: {'$_id.year': 1, '_id.month': 1}}
        ])

        return response.status(200).json({message: data})
    } catch (e) {
        return response.status(500).json({message: 'Server Error'})
    }
}

// Income vs Expense (Comparison)
exports.getIncomeExpense = async (request, response) => {
    try {
        const data = await Record.aggregate([
            {
                $group: {
                    _id: '$type',
                    total: {$sum: '$amount'}
                }
            }
        ])

        return response.status(200).json({message: data})
    } catch (e) {
        return response.status(500).json({message: 'Server Error'})
    }
}

// Recent Records
exports.getRecentRecords = async (request, response) => {
    try {
        const records= await Record.find()
        .sort({date: -1})
        .limit(5)
        .populate('createdBy', 'name email')

        return response.status(200).json({message: records})
    } catch (e) {
        return response.status(500).json({message: 'Server Error'})
    }
}