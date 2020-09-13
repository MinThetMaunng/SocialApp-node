const postService = require('../services/PostService')

const getAll = async (req, res) => {
    const result = await postService.getAll()
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



module.exports = { getAll, create, getOne, uploadFile}