const router = require('express').Router()
const {renderPage} = require('../controllers/livescore.controller')

router.get('/', renderPage)

module.exports = router

