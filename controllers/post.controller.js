const pool = require("../models/db")

const renderPost = (req, res) => {

    const { name } = req.cookies

    const css = {
        name: 'post.css'
    }
    res.locals.css = css

    const sql = `SELECT * FROM post`
    pool.query(sql, (err, result) => {
        if (err) throw err
        res.render('post', { name, result })
    })
}

module.exports = { renderPost }
