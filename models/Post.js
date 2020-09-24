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


PostSchema.virtual('timeAgo').get(function() {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let time =  Math.floor((new Date().getTime() - new Date(this.createdAt).getTime() ) / 1000)
    let [thisMonth, thisDate, thisYear] = new Date().toLocaleDateString().split('/')
    let [postedMonth, postedDate, postedYear] = new Date(this.createdAt).toLocaleDateString().split('/')
    
    if(time < 60) {
        return `${time}s ago`
    } else if (time < (60 * 60)) {
        return `${Math.floor(time / 60)}m ago`
    } else if (time < (60 * 60 * 24)) {
        return `${Math.floor( time / (60 * 60) )}h ago`
    } else if (time < (60 * 60 * 24 * 7)) {
        return `${Math.floor( time / (60 * 60 * 24) )}d ago`
    } else if (time >= (60 * 60 * 24 * 7) && (thisYear == postedYear)) {
        return `${postedDate} ${months[postedMonth]}`
    }
    return `${postedDate} ${months[postedMonth]} ${postedYear}`
})

PostSchema.set('id', false)
PostSchema.plugin(timestamp)

module.exports = mongoose.model("Post", PostSchema, "posts")