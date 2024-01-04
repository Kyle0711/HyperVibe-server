import User from '../models/User.js'
import Comment from '../models/Comment.js'

export const createComment = async (req, res) => {
    try {
        const { text, postId } = req.body
        const user = await User.findById(req.userId)

        const comment = new Comment({
            text,
            userId: req.userId,
            postId,
            userObject: JSON.stringify({
                name: user.name,
                surname: user.surname,
                login: user.login,
                email: user.email,
                avatar: user.avatar,
            }),
        })
        await comment.save()

        res.json(comment)
    } catch (error) {
        console.log(error)
        res.json({ message: 'Failed to create comment.' })
    }
}
