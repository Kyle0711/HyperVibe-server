import { Schema, model, Types } from 'mongoose'

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        userId: {
            type: Types.ObjectId,
            ref: 'User',
        },
        postId: {
            type: Types.ObjectId,
            ref: 'Post',
        },
        userObject: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

export default model('Comment', commentSchema)
