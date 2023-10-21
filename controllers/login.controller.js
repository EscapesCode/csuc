const pool = require('../models/db')


const validasi = (req, res) => {


    const { username, password } = req.body

    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`
    pool.query(sql, [username, password], (err, result) => {
        if (err) throw err

        if (result.length > 0) {
            const css = {
                name: 'home.css'
            }
            res.cookie('name', result[0].username)
            res.cookie('id', result[0].id)
            res.cookie('akses', result[0].akses)
            res.locals.css = css
            if (result[0].username == "gilang" && result[0].password == "admin") {
                return res.redirect('/admin')
            }
            res.redirect('/')
        } else {
            res.redirect('/login')
        }
    })
}

const clearCookies = (req, res) => {
    res.cookie('id', '', { expires: new Date(0) })
    res.cookie('name', '', { expires: new Date(0) })
    res.cookie('akses', '', { expires: new Date(0) })
    res.redirect('/login')
}

module.exports = { validasi, clearCookies }
