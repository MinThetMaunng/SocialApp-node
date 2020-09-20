const router = require('express').Router()
const {login, signup, search} = require('../controllers/UserController')

router
    .get('/', search)
    .post('/signup', signup)
    .post('/login', login)

module.exports = router