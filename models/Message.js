import { Schema, model, Types } from 'mongoose'

const messageSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        userObject: {
            type: String,
            required: true,
        },
        userId: {
            type: Types.ObjectId,
            ref: 'User',
        },
        chatId: {
            type: Types.ObjectId,
            ref: 'Chat',
        },
    },
    {
        timestamps: true,
    },
)

export default model('Message', messageSchema)
