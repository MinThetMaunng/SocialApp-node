const userService = require('../services/UserService')

const signup = async (req, res) => {
    const {status, data, message} = await userService.create(req.body)
    res.status(status).json({data, message})
}

const login = async (req, res) => {
    const { status, data, message } = await userService.login(req.body)
    res.status(status).json({data, message})
}

module.exports = { signup, login }