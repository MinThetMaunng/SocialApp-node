const router = require('express').Router()
const { authenticate } = require('../middlewares/authenticate')
const { getAll, create } = require('../controllers/PostController')

router
    .post('/', authenticate, create)
    .get('/', authenticate, getAll)

module.exports = router