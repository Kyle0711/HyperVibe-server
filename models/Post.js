import { Schema, model, Types } from 'mongoose'

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: '',
        },
        userId: {
            type: Types.ObjectId,
            ref: 'User',
        },
        userObject: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default model('Post', postSchema)
