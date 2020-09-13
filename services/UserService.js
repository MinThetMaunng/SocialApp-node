const User = require('./../models/User')
const jwt = require('jsonwebtoken')

const create = async (body) => {
    try {
        let users = await User.find({ email: body.email })
        if(users.length) {
            return {status: 400, data: null, message: 'This email is already registered!'}
        } else {
            let {_id, email, firstName, middleName, lastName} = await User.create(body)
            let token = jwt.sign({_id, email}, process.env.JWT_SECRET,{expiresIn: "2 days"})
            const data = { _id, email, firstName, middleName, lastName, token }
            
            return {status: 200, data}
        }
    } catch(err) {
        console.error(`Error in signup route ${err}`)
        return { status: 500, data: null, message: "Internal Server Error"}
    }
}

const login = async ({email, password}) => {
    try {
        let user = await User.findOne({ email }).select(' -createdAt -updatedAt')
        if(!user) {
            return {status: 400, data: null, message: 'This email has not registered!'}
        }
        
        let isAuthenticated = await user.authenticate(password)
        if(isAuthenticated) {
            let { _id, email, firstName, middleName, lastName, fullName } = user

            let token = jwt.sign({_id, email}, process.env.JWT_SECRET,{expiresIn: "2 days"})
            let data = { _id, email, firstName, middleName, lastName, fullName, token}
            return {status: 200, data}
        }

        return {status: 401, data: null, message: "Password is incorrect."}
    } catch(err) {
        console.error(`Error in login route ${err}`)
        console.log(err)
        return { status: 500, data: null, message: "Error in logging in."}
    }
}

module.exports = { create, login }