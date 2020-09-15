const Post = require('../models/Post')
const AWS = require('aws-sdk')
const shortid = require('shortid')

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
})

const getAll = async () => {
    try {
        let posts = await Post.find({}, {id: -1}).select('-createdAt -updatedAt -password -__v -id').populate('user', '-createdAt -updatedAt -password -__v -id')
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

const uploadFile = async (file) => {

    const splittedString = file.mimetype.split('/')
    const imageName = `${shortid.generate()}.${splittedString[1]}`
    
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: file.buffer,
        ACL: 'public-read'
    }

    await s3.upload(params, function(err, result) {
        if(err) {
            throw new Error(err)
        }
    })
    return imageName
}

const create = async (user, text, file) => {
    try {
        let imageName 
        if(file) {
            imageName = await uploadFile(file)
        }
        let newPost = new Post({user, text, imageName})
        await newPost.save()

        return { status: 201, data: newPost}
    } catch(err) {
        console.error(`Error in gell all post routes ${err}`)
        return { status: 500, data: null, message: "Internal Server Error"}
    }
}

module.exports = { getAll, getOne, create, uploadFile }