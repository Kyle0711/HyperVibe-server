import { Router } from 'express'
import { createComment } from '../controllers/commentController.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

// Create Comment
// http://localhost:5000/api/comments
router.post('/', checkAuth, createComment)

export default router
