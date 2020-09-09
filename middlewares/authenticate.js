const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if(!token) {
            return res.status(403).json({data: null, message: "Token must be provided."})
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch(err) {
        return res.status(403).json({data: null, message: "Token expired!"})
    }
}

module.exports = { authenticate }