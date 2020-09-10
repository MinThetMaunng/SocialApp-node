const userService = require('../services/UserService')

const signup = async (req, res) => {
    const result = await userService.create(req.body)
    res.status(result.status).json(result)
}

const login = async (req, res) => {
    const result = await userService.login(req.body)
    res.status(result.status).json(result)
}

module.exports = { signup, login }