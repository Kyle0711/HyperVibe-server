import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

import Chat from '../models/Chat.js'
import Message from '../models/Message.js'

export const createChat = async (req, res) => {
    try {
        const { title, description } = req.body

        if (req.files) {
            const filename = Date.now() + req.files.image.name
            req.files.image.mv(
                path.resolve(
                    __dirname,
                    '..',
                    'uploads',
                    'chatImages',
                    filename,
                ),
            )

            const chat = new Chat({
                title,
                description,
                image: filename,
                userId: req.userId,
            })
            await chat.save()

            return res.json(chat)
        }

        const chat = new Chat({
            title,
            description,
            image: '',
            userId: req.userId,
        })
        await chat.save()

        res.json(chat)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to create chat.' })
    }
}

export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find()

        res.json({ chats })
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to get all chats.' })
    }
}

export const getChatById = async (req, res) => {
    try {
        const { id } = req.params
        const chat = await Chat.findById(id)

        res.json({ chat })
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to get chat by id.' })
    }
}

export const getUserChats = async (req, res) => {
    try {
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to get user chats.' })
    }
}

export const deleteChat = async (req, res) => {
    try {
        const { id } = req.params
        const chat = await Chat.findByIdAndDelete(id)

        res.json(chat)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to delete chat.' })
    }
}

export const updateChat = async (req, res) => {
    try {
        const { id } = req.params
        const { title, text } = req.body

        const chat = await Chat.findById(id)

        if (req.files) {
            const filename = Date.now() + req.files.image.name
            req.files.image.mv(
                path.resolve(__dirname, '..', 'uploads', filename),
            )

            chat.image = filename || ''
        }

        chat.title = title
        chat.text = text
        await post.save()

        res.json(chat)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to update chat.' })
    }
}

export const getChatMessages = async (req, res) => {
    try {
        const { id } = req.params
        const messages = await Message.find({ chatId: id })

        res.json({ messages })
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to get chat messages.' })
    }
}
