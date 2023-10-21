const router = require('express').Router()

router.get('/', (req, res) => {

    const css = {
        name: "home.css",
    }

    res.locals.css = css
    const { name } = req.cookies
    res.render('home', { name })
})


module.exports = router
