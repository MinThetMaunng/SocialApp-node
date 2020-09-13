const router = require('express').Router()
const { authenticate } = require('../middlewares/authenticate')
const { getAll, create, getOne, uploadFile } = require('../controllers/PostController')
const multer = require('multer')
const upload = multer()

router
    .post('/', authenticate, upload.single('image'), create)
    .get('/', authenticate, getAll)
    .get('/:id', authenticate, getOne)

module.exports = router