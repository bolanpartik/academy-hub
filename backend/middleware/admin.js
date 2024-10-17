const jwt = require('jsonwebtoken')
const { JWT_ADMIN_SECRET } = require('../config')

function adminMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).send({
            message: 'Token missing'
        })
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({
            message: 'Token missing'
        })
    }
    try {
        const verifyToken = jwt.verify(token, JWT_ADMIN_SECRET)
        req.adminId = verifyToken.adminId
        next()
    } catch (error) {
        res.status(401).send({
            message: 'Invalid token'
        })
    }
}
module.exports = {
    adminMiddleware,
}