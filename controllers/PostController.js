const postService = require('../services/PostService')

const getAll = async (req, res, next) => {
    const result = await postService.getAll()
    res.status(result.status).json(result)
}

const create = async (req, res) => {
    const result = await postService.create(req.user._id, req.body.text)
    res.status(result.status).json(result)
}

module.exports = { getAll, create}