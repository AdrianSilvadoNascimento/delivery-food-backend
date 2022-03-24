const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET_KEY

module.exports = async (req, res, next) => {    
    try {
        const [_, token] = req.headers['x-bearer-authorization'].split(' ')
        const decodedToken = jwt.verify(token, SECRET)
        req.userData = {
            username: decodedToken.username,
            email: decodedToken.email,
            userId: decodedToken.userId
        }
        next()
    } catch (error) {
        res.status(403).json({ message: error.message })
    }
}