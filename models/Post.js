const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        ref: 'User',
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
    }
})

PostSchema.plugin(timestamp)

module.exports = mongoose.model("Post", PostSchema, "posts")