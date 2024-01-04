import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        login: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        images: [String],
    },
    {
        timestamps: true,
    },
)

export default model('User', userSchema)
