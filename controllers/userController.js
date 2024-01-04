import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const registerUser = async (req, res) => {
    try {
        const { name, surname, login, email, password, description } = req.body

        const isUsedLogin = await User.findOne({ login })
        if (isUsedLogin) {
            return res.json({ message: 'This login already exist.' })
        }

        const isUsedEmail = await User.findOne({ login })
        if (isUsedEmail) {
            return res.json({ message: 'This email already exist.' })
        }

        const passwordHash = bcrypt.hashSync(password, 10)

        if (req.files) {
            const filename = Date.now() + req.files.avatar.name
            req.files.avatar.mv(
                path.resolve(__dirname, '..', 'uploads', 'avatars', filename),
            )

            const user = new User({
                name,
                surname,
                login,
                email,
                password: passwordHash,
                description,
                avatar: filename,
            })

            await user.save()

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d',
            })

            return res.json({
                user,
                token,
                message: 'Registration completed successfully.',
            })
        }

        const user = new User({
            name,
            surname,
            login,
            email,
            password: passwordHash,
            description,
            avatar: '',
        })

        await user.save()

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        })

        res.json({
            user,
            token,
            message: 'Registration completed successfully.',
        })
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { login, email, password } = req.body

        const user = await User.findOne({ login })
        if (!user) {
            return res.json({ message: 'This user does not exist.' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.json({ message: 'Incorrect password.' })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        })

        res.json({ user, token, message: '' })
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.json({ users })
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to get all users.' })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.json({ message: 'This user does not exist.' })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        })

        res.json({ user, token })
    } catch (error) {
        console.log(error)
    }
}

export const destroyUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId)
        if (!user) {
            return res.json({ message: 'This user does not exist.' })
        }

        res.json({ user, message: 'This user has been deleted.' })
    } catch (error) {
        console.log(error)
    }
}

export const editUser = async (req, res) => {
    try {
        const { name, surname, login, email, password, description } = req.body

        const user = await User.findById(req.userId)
        if (!user) {
            return res.json({ message: 'This user does not exist.' })
        }

        if (req.files) {
            const filename = Date.now() + req.files.avatar.name
            req.files.avatar.mv(
                path.resolve(__dirname, '..', 'uploads', 'avatars'),
            )

            user.name = name
            user.surname = surname
            user.login = login
            user.email = email
            user.password = password
            user.description = description
            user.avatar = filename

            user.save()

            res.json({ user })
        }

        user.name = name
        user.surname = surname
        user.login = login
        user.email = email
        user.password = password
        user.description = description

        user.save()

        res.json({ user })
    } catch (error) {
        console.log(error)
    }
}

export const addImageToUser = async (req, res) => {
    try {
        // const user = await User.findById(req.userId)

        if (req.files) {
            const filename = Date.now() + req.files.image.name
            req.files.image.mv(
                path.resolve(__dirname, '..', 'uploads', filename),
            )

            await User.findByIdAndUpdate(req.userId, {
                $push: { images: filename },
            })

            return res.json(filename)
        }
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to add image to user' })
    }
}
