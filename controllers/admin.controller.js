const pool = require('../models/db')

const renderPage = (req, res) => {

    if (!req.cookies.name) {
        res.redirect('/login')
    } else if (req.cookies.akses == 0) {
        return res.redirect('/login')
    }

    const sql = `SELECT users.username, skor.skor 
                FROM users 
                LEFT JOIN skor ON users.id = skor.user_id 
                WHERE users.akses = 0
                ORDER BY skor.skor DESC`
    
    pool.query(sql, (err, result) => {
        if (err) throw err

        const sql2 = `SELECT COUNT(username) AS total FROM users WHERE akses = 0`
        pool.query(sql2, (err, result2) => {
            if (err) throw err

            const sql3 = `SELECT COUNT(title) AS total FROM challange`
            pool.query(sql3, (err, result3) => {
                if (err) throw err
                res.render('admin', { result, result2, result3 })
            })

        })

    })

}

const renderPageTambah = (req, res) => {
    res.render('tambah')
}

const tambahData = (req, res) => {
    const { title, skor, description, link, ipnc, format, kategori, jawaban } = req.body
    const sql = `INSERT INTO challange (title, skor, description, link, ipnc, format, kategori, jawaban) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    pool.query(sql, [title, skor, description, link, ipnc, format, kategori, jawaban], (err, result) => {
        if (err) throw err
        res.render('tambah')
    })
}

const renderList = (req, res) => {
    const sql = `SELECT * FROM challange`

    pool.query(sql, (err, result) => {
        if (err) throw err
        res.render('list', { result })
    })
}

const hapusData = (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM challange WHERE id = ?`

    pool.query(sql, [id], (err, result) => {
        res.redirect('/admin/list')
    })
}


const renderPagUser = (re, res) => {
    const sql = `SELECT * FROM users`

    pool.query(sql, (err, result) => {
        if (err) throw err
        res.render('userAdmin', { result })
    })
}

const tambahUser = (req, res) => {
    const { username, password } = req.body

    const sql = `INSERT INTO users (username, password, akses) VALUES (?, ?, ?)`
    pool.query(sql, [username, password, 0], (err, result) => {
        if (err) throw err
        res.redirect('/admin/user/list')
    })
}

const renderPageTambahUser = (req, res) => {
    res.render('tambahUser')
}

const hapusUser = (req, res) => {
    const { id } = req.params
    const sql = `DELETE FROM users WHERE id = ?`
    pool.query(sql, [id], (err, result) => {
        if (err) throw err
        res.redirect('/admin/user/list')
    })
}

const renderPost = (req, res) => {
    const sql = `SELECT * FROM post`
    pool.query(sql, (err, result) => {
        if (err) throw err
        res.render('postAdmin', { result })
    })
}

const hapusPost = (req, res) => {
    const { id } = req.params
    const sql = `DELETE FROM post WHERE id = ?`
    pool.query(sql, [id], (err, result) => {
        if (err) throw err
        res.redirect('/admin/post/list')
    })
}

const renderTambahPost = (req, res) => {
    res.render('tambahPost')
}

const tambahPost = (req, res) => {
    const { judul, body } = req.body
    const sql = `INSERT INTO post (judul, body) VALUES (?, ?)`
    pool.query(sql, [judul, body], (err, result) => {
        if (err) throw err
        res.redirect('/admin/post/tambah')
    })
}

// last
const renderAcv = (req, res) => {
    const sql = `SELECT * FROM acv`
    pool.query(sql, (err, result) => {
        if (err) throw err
        res.render('acvAdmin', { result })
    })
}

const hapusAcv = (req, res) => {
    const { id } = req.params
    const sql = `DELETE FROM acv WHERE id = ?`
    pool.query(sql, [id], (err, result) => {
        if (err) throw err
        res.redirect('/admin/acv/list')
    })
}

const renderTambahAcv = (req, res) => {
    res.render('tambahAcv')
}

const tambahAcv = (req, res) => {
    const { rank, competition, date } = req.body
    const sql = `INSERT INTO acv (rank, competition, date) VALUES (?, ?, ?)`
    pool.query(sql, [rank, competition, date], (err, result) => {
        if (err) throw err
        res.redirect('/admin/acv/tambah')
    })
}

module.exports = {
    renderPage,
    renderPageTambah,
    tambahData,
    renderList,
    hapusData,
    renderPagUser,
    tambahUser,
    renderPageTambahUser,
    hapusUser,
    renderPost,
    hapusPost,
    renderTambahPost,
    tambahPost,
    renderAcv,
    hapusAcv,
    renderTambahAcv,
    tambahAcv
}

