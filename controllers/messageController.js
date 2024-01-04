import Message from '../models/Message.js'
import User from '../models/User.js'

export const createMessage = async (req, res) => {
    try {
        // Empty
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to create message.' })
    }
}

export const deleteMessage = async (req, res) => {
    try {
        // Empty
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to delete message.' })
    }
}

export const updateMessage = async (req, res) => {
    try {
        // Empty
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to update message.' })
    }
}
