import { Router } from 'express'
import {
    createPost,
    getAllPosts,
    getPostById,
    getUserPosts,
    deletePost,
    updatePost,
    getPostComments,
} from '../controllers/postController.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

// Create Post
// http://localhost:5000/api/posts
router.post('/', checkAuth, createPost)

// Get All Posts
// http://localhost:5000/api/posts
router.get('/', getAllPosts)

// Get Post By Id
// http://localhost:5000/api/posts/:id
router.get('/:id', getPostById)

// Get User Posts
// http://localhost:5000/api/posts/user/me
router.get('/user/me', checkAuth, getUserPosts)

// Delete Post
// http://localhost:5000/api/posts/:id
router.delete('/:id', checkAuth, deletePost)

// Update Post
// http://localhost:5000/api/posts/:id
router.patch('/:id', checkAuth, updatePost)

// Get Post Comments
// http://localhost:5000/api/posts/comments/:id
router.get('/comments/:id', getPostComments)

export default router
