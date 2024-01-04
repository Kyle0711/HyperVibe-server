import { Router } from 'express'
import {
    registerUser,
    loginUser,
    getAllUsers,
    getUser,
    destroyUser,
    editUser,
    addImageToUser,
} from '../controllers/userController.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()

// Register User
// http://localhost:5000/api/users/register
router.post('/register', registerUser)

// Login User
// http://localhost:5000/api/users/login
router.post('/login', loginUser)

// Get All Users
// http://localhost:5000/api/users
router.get('/', getAllUsers)

// Get User
// http://localhost:5000/api/users/me
router.get('/me', checkAuth, getUser)

// Delete User
// http://localhost:5000/api/users/delete
router.delete('/delete', checkAuth, destroyUser)

// Update User
// http://localhost:5000/api/users/edit
router.patch('/edit', checkAuth, editUser)

// Add Image To User
// http://localhost:5000/api/users/add-image
router.post('/add-image', checkAuth, addImageToUser)

export default router
