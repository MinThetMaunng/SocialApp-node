const postService = require('../services/PostService')

const getAll = async (req, res) => {
    const { status, data, message } = await postService.getAll()
    res.status(status).json({data, message})
}

const create = async (req, res) => {
    const { status, data, message } = await postService.create(req.body)
    res.status(status).json({data, message})
}

module.exports = { getAll, create}