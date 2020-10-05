const User = require('./../models/User')
const Follow = require('./../models/Follow')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongoose').Types

const searchFriends = async (name, currentUserId) => {
    
    try {

        let users = await User.aggregate([
            {
                $match: { fullName: {$regex: ".*" + name + ".*", $options:'i'} }
            },
            {
                $lookup: {
                    from: "follows",
                    let: { 
                        id: "$_id",
                        userId: ObjectId(currentUserId)
                    },
                    pipeline:[
                        { 
                            $match: {
                                $expr: {
                                    $and: [ { $eq: ["$friend", "$$id"] }, { $eq: ["$user", "$$userId"] } ],
                                }
                            }
                        }
                    ],
                    as: "follow"
                },  
            },
            {
                $project: {
                    _id: 1,
                    isFollowing: { 
                        $cond: { 
                            if: { 
                                $anyElementTrue: "$follow" 
                            }, 
                            then: true, 
                            else: false
                        }
                    },
                    firstName: 1,
                    middleName: 1,
                    lastName: 1,
                    fullName: 1
                }
            }
        ])

        return { status: 200, data: users }
    } catch(err) {
        console.error(`Error in user search route ${err}`)
        return { status: 500, data: null, message: "Internal Server Error"}
    }
}

const getOne = async (_id) => {
    try {
        let user = await User.findById(_id).populate('user')
        let noOfFollowers = await Follow.countDocuments({friend: _id})
        let noOfFollowings = await Follow.countDocuments({user: _id})
        
        return { status: 200, data: {user, noOfFollowers, noOfFollowings}}
    } catch(err) {
        return { status: 404, data: null, message: "User Not Found"}
    }
}

const create = async (body) => {
    try {
        let users = await User.find({ email: body.email })
        if(users.length) {
            return {status: 400, data: null, message: 'This email is already registered!'}
        } else {
            let {_id, email, firstName, middleName, lastName} = await User.create(body)
        
            let token = signJwt(_id, email)
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

            let token = signJwt(_id, email)
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

const signJwt = (_id, email) => jwt.sign({_id, email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_TIME})

module.exports = { create, login, searchFriends, getOne}