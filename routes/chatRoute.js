import { Router } from 'express'
import {
    createChat,
    getAllChats,
    getChatById,
    getUserChats,
    deleteChat,
    updateChat,
    getChatMessages,
} from '../controllers/chatController.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

// Create Chat
// http://localhost:5000/api/chats
router.post('/', checkAuth, createChat)

// Get All Chats
// http://localhost:5000/api/chats
router.get('/', checkAuth, getAllChats)

// Get Chat By Id
// http://localhost:5000/api/chats/:id
router.post('/:id', checkAuth, getChatById)

// Get User Chats
// http://localhost:5000/api/chats/user/me
router.post('/user/me', checkAuth, getUserChats)

// Delete Chat
// http://localhost:5000/api/chats/:id
router.post('/:id', checkAuth, deleteChat)

// Update Chat
// http://localhost:5000/api/chats/:id
router.post('/:id', checkAuth, updateChat)

// Get Chat Messages
// http://localhost:5000/api/chats/messages/:id
router.get('/messages/:id', getChatMessages)

export default router
