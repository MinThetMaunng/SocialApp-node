const router = require('express').Router()
const {login, signup, search} = require('../controllers/UserController')
const { authenticate } = require('../middlewares/authenticate')

router
    .get('/', authenticate, search)
    .post('/signup', signup)
    .post('/login', login)

module.exports = router