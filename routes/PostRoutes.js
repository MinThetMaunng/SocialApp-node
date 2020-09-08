const router = require('express').Router()
const { getAll, create } = require('../controllers/PostController')

router
    .post('/', create)
    .get('/', getAll)

module.exports = router