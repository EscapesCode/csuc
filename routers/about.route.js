const router = require('express').Router()

router.get('/', (req, res) => {

    const css = {
        name: "about.css"
    }

    const { name } = req.cookies

    res.locals.css = css;

    res.render('about', { name })
})


module.exports = router

