import jwt from 'jsonwebtoken'

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded._id

        next()
    } else {
        return res.json({
            message: 'Нет доступа.',
        })
    }
}
