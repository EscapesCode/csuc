const router = require('express').Router()
const { renderPost } = require('../controllers/post.controller')


router.get('/', renderPost)


module.exports = router

