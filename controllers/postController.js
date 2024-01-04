import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

import User from '../models/User.js'
import Post from '../models/Post.js'
import Comment from '../models/Comment.js'

// Create Post
export const createPost = async (req, res) => {
    try {
        const { title, text, tags } = req.body
        const user = await User.findById(req.userId)

        if (req.files) {
            const filename = Date.now() + req.files.image.name
            req.files.image.mv(
                path.resolve(
                    __dirname,
                    '..',
                    'uploads',
                    'postImages',
                    filename,
                ),
            )

            const post = new Post({
                title,
                text,
                tags,
                image: filename,
                userId: req.userId,
                userObject: JSON.stringify({
                    name: user.name,
                    surname: user.surname,
                    login: user.login,
                    email: user.email,
                    avatar: user.avatar,
                }),
            })
            await post.save()

            return res.json(post)
        }

        const post = new Post({
            title,
            text,
            tags,
            image: '',
            userId: req.userId,
            userObject: JSON.stringify({
                name: user.name,
                surname: user.surname,
                login: user.login,
                email: user.email,
                avatar: user.avatar,
            }),
        })
        await post.save()

        return res.json(post)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to create post.' })
    }
}

// Get All Posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()

        res.json({ posts })
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to get all posts.' })
    }
}

// Get Post By Id
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)

        res.json({ post })
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to get post by id.' })
    }
}

// Get User Posts
export const getUserPosts = async (req, res) => {
    try {
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to get user posts.' })
    }
}

// Delete Post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findByIdAndDelete(id)

        res.json(post)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to delete post.' })
    }
}

// Update Post
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { title, text, tags } = req.body

        const post = await Post.findById(id)

        if (req.files) {
            const filename = Date.now() + req.files.image.name
            req.files.image.mv(
                path.resolve(__dirname, '..', 'uploads', filename),
            )

            post.image = filename || ''
        }

        post.title = title
        post.text = text
        post.tags = tags
        await post.save()

        res.json(post)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to update post.' })
    }
}

export const getPostComments = async (req, res) => {
    try {
        const { id } = req.params
        const comments = await Comment.find({ postId: id })

        res.json({ comments })
    } catch (error) {
        console.log(error)
    }
}
