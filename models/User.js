const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const timestamp = require('mongoose-timestamp')
const opts = { toJSON: { virtuals: true, versionKey: false } }

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
    },
    middleName: {
        type: String,
        requied: false,
        default: undefined,
    },
    lastName: {
        type: String,
        required: false,
        default: undefined,
    },
    fullName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    // follow: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'Follow'
    // }
}, opts)


const setFullName = ({firstName, middleName, lastName}) => {
    let fullNameString = firstName

    if(middleName != "" && middleName != undefined) {
        fullNameString += ` ${middleName}`
    }
    if(lastName != "" ** lastName != undefined) {
        fullNameString += ` ${lastName}`
    }

    return fullNameString
}

UserSchema.pre('save', function(next) {
    let user = this
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    user.fullName = setFullName(user)
    next()
})

UserSchema.methods.authenticate = async function(password) {
    return bcrypt.compareSync(password, this.password, function(err, res) {
        if(err) {
            console.log("Error in authenticate")
            throw error
        }
        return res
    })
}

// UserSchema.statics.searchFriends = async function(currentUserId) {
//     return 
// }

UserSchema.set('id', false)
UserSchema.plugin(timestamp)

module.exports = mongoose.model("User", UserSchema, "users")
