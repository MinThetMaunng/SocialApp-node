const mongoose = require('mongoose')
const User = require('./User')
const { ObjectId } = require('mongoose').SchemaTypes
const opts = { toJSON: { versionKey: false } }

const FollowSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    friend: {
        type: ObjectId,
        required: true,
        ref: 'User'
    }
}, opts)

module.exports = mongoose.model('Follow', FollowSchema, 'follows')