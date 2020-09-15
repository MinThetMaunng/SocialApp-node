const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const opts = { toJSON: { virtuals: true, versionKey: false } }

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
    },
    user: {
        ref: 'User',
        required: true,
        type: mongoose.SchemaTypes.ObjectId,
    }
}, opts)

PostSchema.virtual('imageUrl').get(function() {
    if(this.imageName == undefined) {
        return undefined
    }
    return `${process.env.IMAGE_BASE_URL}${this.imageName}`
})

PostSchema.set('id', false)
PostSchema.plugin(timestamp)

module.exports = mongoose.model("Post", PostSchema, "posts")