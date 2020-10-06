const postService = require('../services/PostService')

const getAll = async (req, res) => {
    const result = await postService.getAll()
    res.status(result.status).json(result)
}

const getPosts = async (req, res) => {
    const result = await postService.getPosts(req.query.userId, req.query.limit, req.query.skip)
    res.status(result.status).json(result)
}

const getOne = async (req, res) => {
    const result = await postService.getOne(req.params.id)
    res.status(result.status).json(result)
}

const create = async (req, res) => {
    const result = await postService.create(req.user._id, req.body.text, req.file)
    res.status(result.status).json(result)
}

const uploadFile = async (req, res) => {
    const result = await postService.uploadFile(req.file)
    res.status(result.status).json(result)
}

const remove = async (req, res) => {
    const result = await postService.remove(req.params.id, req.user._id)
    res.status(result.status).json(result)
}



module.exports = { getAll, create, getOne, uploadFile, remove, getPosts}