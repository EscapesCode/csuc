const router = require('express').Router()
const { validasi, clearCookies } = require('../controllers/login.controller')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/login', validasi)
router.get('/logout', clearCookies)

module.exports = router;

