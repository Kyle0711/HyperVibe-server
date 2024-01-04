import { Schema, model, Types } from 'mongoose'

const chatSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
        userId: {
            type: Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    },
)

export default model('Chat', chatSchema)
