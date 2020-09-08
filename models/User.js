const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const timestamp = require('mongoose-timestamp')


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,
    },
    middleName: {
        type: String,
        requied: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', function(next) {
    let user = this
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
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

UserSchema.plugin(timestamp)

module.exports = mongoose.model("User", UserSchema, "users")
