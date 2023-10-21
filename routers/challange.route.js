const router = require('express').Router()
const { getAll, getById, cekJawaban } = require('../controllers/challange.controller')

router.get('/', getAll);
router.get('/tag/:id', getById)
router.post('/answer/:id', cekJawaban)

module.exports = router

