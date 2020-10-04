const userService = require('../services/UserService')

const signup = async (req, res) => {
    const result = await userService.create(req.body)
    res.status(result.status).json(result)
}

const login = async (req, res) => {
    const result = await userService.login(req.body)
    res.status(result.status).json(result)
}

const search = async (req, res) => {
    const result = await userService.searchFriends(req.query.name, req.user._id)
    res.status(result.status).json(result)
}

const getOne = async (req, res) => {
    const result = await userService.getOne(req.params.id)
    res.status(result.status).json(result)
}


module.exports = { signup, login, search, getOne }