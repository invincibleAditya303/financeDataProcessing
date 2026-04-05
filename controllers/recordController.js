const Record = require('../models/Record')

exports.createRecord = async (request, response) => {
    try {
        const {amount, category, type, notes, date} = request.body

        if (amount === undefined || amount === null || isNaN(amount)) {
            return response.status(400).json({message: 'Valid amount is required'})
        }

        if (Number(amount) <=0) {
            return response.status(400).json({message: 'Amount must be greater than 0'})
        }

        if (!type || type.trim() === '') {
            return response.status(400).json({message: 'Type is required'})
        }

        if (!['income', 'expense'].includes(type)) {
            return response.status(400).json({message: 'Type must be income or expense'})
        }

        if (!category || category.trim() === '') {
            return response.status(400).json({message: 'Category is required'})
        }

        let transactionNotes = undefined

        if (notes !== undefined && notes !== null) {
            if (typeof notes !== 'string') {
                return response.status(400).json({message: 'Notes must be string'})
            }

            transactionNotes = notes.trim()
        }

        let recordDate = new Date()

        if (date !== undefined && date !== null) {
            const parsedDate = new Date(date)

            if (isNaN(parsedDate.getTime())) {
                return response.status(400).json({message: 'Invalid date format'})
            }

            recordDate = parsedDate
        }


        const record = await Record.create({
            amount: Number(amount),
            type: type.trim(),
            category: category.trim(),
            notes: transactionNotes,
            createdBy: request.user.id,
            date: recordDate
        })

        await record.save()

        return response.status(201).json({message: 'Record created successfully'})
    } catch (e) {
        console.log('Record add error', e)
        return response.status(500).json({message: 'Server Error'})
    }
}

exports.getRecords = async (request, response) => {
    try {
        let records

        if (request.user.role === 'admin') {
            records = await Record.find().populate('user', 'name email')
        } else {
            records = await Record.find({createdBy: request.user.id})
        }

        return response.status(200).json({message: records})
    } catch (e) {
        return response.status(500).json({message: 'Server error'})
    }
}

exports.getRecordById = async (request, response) => {
    try {
        const {id} = request.params
        const record = await Record.findById(id)

        if (!record) {
            return response.status(400).json({message: 'Record not found'})
        }

        if (record.createdBy.toString() !== request.user.id && request.user.role !== 'admin') {
            return response.status(403).json({message: 'Forbidden'})
        }

        return response.status(200).json({message: record})
    } catch (e) {
        return response.status(500).json('Server error')
    }
}

exports.updateRecord = async (request, response) => {
    try {
        const {amount, type, category, notes, date} = request.body

        const {id} = request.params
        const record = await Record.findById(id)

        if (!record) {
            return response.status(400).json({message: 'Record not found'})
        }

        if (record.createdBy.toString() !== request.user.id && request.user.role !== 'admin') {
            return response.status(403).json({message: 'Forbidden'})
        }

        if (amount !== undefined) {
            if (amount !== null || isNaN(amount) || Number(amount) <= 0) {
                return response.status(400).json({message: 'Ivalid amount'})
            }

            record.amount = Number(amount)
        }

        if (type !== undefined) {
            if (typeof type !== 'string' || type.trim() === '') {
                return response.status(400).json({message: 'Type cannot be empty'})
            }

            if (!['income', 'expense'].includes(type)) {
                return response.status(400).json({message: 'Type must be income or expense'})
            }

            record.type = type.trim()
        }

        if (category !== undefined) {
            if (typeof category !== 'string' || category.trim() === '') {
                return response.status(400).json({message: 'Category cannot be empty'})
            }

            record.category = category.trim()
        }

        if (notes !== undefined) {
            if (notes !== null && typeof notes !== 'string') {
                return response.status(400).json({message: 'Notes must be a string'})
            }

            record.notes = notes && notes.trim() !== '' ? notes.timr() : undefined
        }

        if (date !== undefined) {
            if (date !== null) {
                const parsedDate = new Date(date)

                if (isNaN(parsedDate.getTime())) {
                    return response.status(400).json({message: 'Invalid date format'})
                }
                
                record.date = parsedDate
            }
        }

        await record.save()

        return response.status(200).json({message: 'Record updated successfully'})
    } catch (e) {
        return response.status(500).json({message: 'Server Error'})
    }
 }

 exports.deleteRecord = async (request, response) => {
    try {
        const {id} = request.params
        const record = await Record.findById(id)

        if (!record) {
            return response.status(400).json({message: 'Record not found'})
        }

        if (record.createdBy.toString() !== request.user.id && request.user.role !== 'admin') {
            return response.status(403).json({message: 'Forbidden'})
        }
        
        await record.deleteOne()
        response.status(200).json({message: 'Recor deleted'})
    } catch (e) {
        return response.status(500).json({message: 'Server Error'})
    }
 }