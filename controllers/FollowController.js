const followService = require('../services/FollowService')

const follow = async(req, res) => {
    const result = await followService.follow(req.user._id, req.params.friend)
    res.status(result.status).json(result)
}

module.exports = { follow }