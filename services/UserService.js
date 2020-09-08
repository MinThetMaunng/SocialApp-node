const User = require('./../models/User')

const create = async ({email, password}) => {
    try {
        let users = await User.find({ email })
        if(users.length) {
            return {status: 400, data: null, message: 'This email is already registered!'}
        } else {
            let newUser = await User.create({email, password})
            return {status: 201, data: newUser}
        }
    } catch(err) {
        return { status: 500, data: null, message: err}
    }
}

const login = async ({email, password}) => {
    try {
        let user = await User.findOne({ email })
        if(!user) {
            return {status: 400, data: null, message: 'This email has not registered!'}
        }

        let isAuthenticated = await user.authenticate(password)
        if(isAuthenticated) {
            return {status: 200, data: user}
        }

        return {status: 403, data: null, message: "Password is incorrect."}
    } catch(err) {
        console.log(err)
        return { status: 500, data: null, message: "Error in logging in."}
    }
}

module.exports = { create, login }