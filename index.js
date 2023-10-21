const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')

const homeRoute = require('./routers/home.router')
const loginRoute = require('./routers/login.route')
const aboutRoute = require('./routers/about.route')
const challangeRoute = require('./routers/challange.route')
const adminRoute = require('./routers/admin.route')
const postRoute = require('./routers/post.route')
const achievmentRoute = require('./routers/achievment.route')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())

app.use('/', homeRoute)
app.use('/login', loginRoute)
app.use('/about', aboutRoute)
app.use('/challange', challangeRoute)
app.use('/admin', adminRoute)
app.use('/post', postRoute)
app.use('/achievment', achievmentRoute)


app.listen(3000, () => {
    console.log(`server listening on http://localhost:3000`)
})
