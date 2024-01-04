import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import { createServer } from 'http'
import { Server } from 'socket.io'

import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import commentRoute from './routes/commentRoute.js'
import chatRoute from './routes/chatRoute.js'
// import messageRoute from './routes/messageRoute.js'
import route from './routes/route.js'

import Message from './models/Message.js'

const app = express()
config()

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    socket.on('join', ({ user, chat }) => {
        socket.join(chat)
    })

    // Create Message
    socket.on(
        'createMessage',
        async ({
            text,
            chatId,
            user: { _id, name, surname, login, email, avatar },
        }) => {
            console.log('Hello')
            const message = new Message({
                text,
                userObject: JSON.stringify({
                    name,
                    surname,
                    login,
                    email,
                    avatar,
                }),
                chatId,
                userId: _id,
            })

            await message.save()

            io.emit('message', message)
        },
    )

    // Delete Message
    socket.on('deleteMessage', async ({ messageId }) => {
        const message = await Message.findByIdAndDelete(messageId)

        socket.emit()
    })

    // Update Message
    socket.on('updateMessage', ({}) => {})
})

// MiddleWares
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(fileUpload())

// MiddleWars Uploads
app.use(express.static(path.resolve(__dirname, 'uploads', 'avatars')))
app.use(express.static(path.resolve(__dirname, 'uploads', 'postImages')))
app.use(express.static(path.resolve(__dirname, 'uploads', 'chatImages')))

// Constants
const PORT = process.env.PORT || 5000
const HOSTNAME = process.env.HOSTNAME
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Routes
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)
app.use('/api/chats', chatRoute)
// app.use('/api/messages', messageRoute)
app.use(route)

async function start() {
    try {
        await server.listen(
            PORT,
            /* HOSTNAME */ async (error) => {
                error
                    ? console.log(error)
                    : await mongoose
                          .connect(
                              `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.dpc9gkh.mongodb.net/${DB_NAME}`,
                          )
                          .then(() => console.log('Connected to DB.'))
                          .catch((error) => console.log(error))
            },
        )
    } catch (error) {
        console.log(error)
    }
}
start()
