const route = require('express').Router()
const { render } = require('../controllers/achievment.controller')


route.get('/', render)

module.exports = route

