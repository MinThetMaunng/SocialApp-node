const Follow = require('../models/Follow')

const follow = async(userId, friend) => {
    try {
        let follow = await Follow.findOne({user: userId, friend})
        if(!follow) {
            follow = await Follow.create({user: userId, friend})
            return { status: 201, data: follow}
        }
        await follow.remove()
        return {status: 200, data: null}
    } catch(err) {
        console.log(`Error in follow service ${err}`)
        return {status: 500, data: null}
    }
}

module.exports = { follow }