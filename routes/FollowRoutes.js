const router = require('express').Router()
const { follow } = require('../controllers/FollowController')
const { authenticate } = require('../middlewares/authenticate')

router.post('/:friend', authenticate, follow)

module.exports = router