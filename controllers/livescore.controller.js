const pool = require('../models/db')

const renderPage = (req, res) => {
    if (!req.cookies.name) {
        res.redirect('/login')
    } 
    const { name } = req.cookies
    const sql = `SELECT users.username, skor.skor 
                FROM users 
                LEFT JOIN skor ON users.id = skor.user_id 
                WHERE users.akses = 0
                ORDER BY skor.skor DESC`
    
                pool.query(sql, (err,result) => {
                    if (err) throw err
                            res.render('livescore',{name,result})
                            // console.log(result);
                        })
                    }

module.exports = {
    renderPage
}

