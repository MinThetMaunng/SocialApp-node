const Post = require('../models/Post')

const getAll = async () => {
    try {
        let posts = await Post.find().populate('user')
        return { status: 200, data: posts }
    } catch(err) {
        return { status: 500, data: null, message: "Internal Server Error"}
    }
}

const getOne = async (_id) => {
    try {
        let post = await Post.findById(_id).populate('user')
        return { status: 200, data: post}
    } catch(err) {
        return { status: 404, data: null, message: "User Not Found"}
    }
}

const create = async (body) => {
    try {
        let newPost = await Post.create(body)
        return { status: 201, data: newPost}
    } catch(err) {
        return { status: 500, data: null, message: "Internal Server Error"}
    }
}

module.exports = { getAll, getOne, create }