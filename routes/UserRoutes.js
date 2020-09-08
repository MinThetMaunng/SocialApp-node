const router = require('express').Router()
const {login, signup} = require('../controllers/UserController')

router
    .post('/signup', signup)
    .post('/login', login)

module.exports = router