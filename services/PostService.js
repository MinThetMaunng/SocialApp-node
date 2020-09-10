const Post = require('../models/Post')

const getAll = async () => {
    try {
        let posts = await Post.find().select('-createdAt -updatedAt -password -__v').populate('user', '-createdAt -updatedAt -password -__v')
        let total = await Post.countDocuments()
        return { status: 200, data: posts, total }
    } catch(err) {
        console.error(`Error in gell all post routes ${err}`)
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

const create = async (user, text) => {
    try {
        let newPost = new Post({user, text})
        await newPost.save()
        return { status: 201, data: newPost}
    } catch(err) {
        console.error(`Error in gell all post routes ${err}`)
        return { status: 500, data: null, message: "Internal Server Error"}
    }
}

module.exports = { getAll, getOne, create }