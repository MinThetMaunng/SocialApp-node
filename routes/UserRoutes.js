const router = require('express').Router()
const {login, signup, search, getOne} = require('../controllers/UserController')
const { authenticate } = require('../middlewares/authenticate')

router
    .get('/', authenticate, search)
    .get('/:id', authenticate, getOne)
    .post('/signup', signup)
    .post('/login', login)

module.exports = router