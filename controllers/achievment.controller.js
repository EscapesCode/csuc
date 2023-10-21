const pool = require("../models/db")

const render = (req, res) => {
    const { name } = req.cookies
    const css = {
        name: 'achievment.css'
    }
    res.locals.css = css

    const sql = `SELECT * FROM acv`
    pool.query(sql, (err, result) => {
        if (err) throw err
        res.render('achievment', { name, result })

    })
}

module.exports = { render }
