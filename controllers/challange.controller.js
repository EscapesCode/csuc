const pool = require('../models/db')


const getAll = (req, res) => {

    if (!req.cookies.name) {
        return res.redirect('/login')
    }

    const css = {
        name: "challange.css"
    }
    res.locals.css = css
    const { name } = req.cookies
    const { id } = req.cookies


    const sql2 = `SELECT challange.id, challange.title, challange.kategori, challange.skor, IF(stateSkor.isAnswer IS NOT NULL, 'true', 'false') AS status from challange
        LEFT JOIN stateSkor ON challange.id = stateSkor.challange_id AND stateSkor.user_id = ${id}`

    pool.query(sql2, (err, result2) => {
        res.render('challange', { name, result2 })
        console.log(result2)
    })

}

const getById = (req, res) => {
    const css = {
        name: "detail.css"
    }

    const { name } = req.cookies
    res.locals.css = css

    const id = req.params.id
    const sql = `SELECT * FROM challange WHERE id = ?`
    pool.query(sql, [id], (err, result) => {
        if (err) throw err
        res.render('detail', { result, name })
    })
}

const cekJawaban = (req, res) => {

    const idChallange = req.params.id
    const { jawabanUser } = req.body

    const sql = `SELECT * FROM challange where id = ?`
    pool.query(sql, [idChallange], (err, result) => {
        const jawabanBenar = result[0].jawaban

        //ambil id user
        const { id } = req.cookies

        //cocokan jawaban user dengan jawaban di db
        if (jawabanUser == jawabanBenar) {
            let skorDiDb = 0

            //ambil skor user di db
            const sqlAmbilSkor = `SELECT * FROM skor WHERE user_id = ?`
            pool.query(sqlAmbilSkor, [id], (err, ambilSkor) => {

                //jika user belum ada di table skor maka buat skor 0 terlebih dahulu
                if (ambilSkor < 1) {
                    const sqlBuatUser = `INSERT INTO skor(skor, user_id) VALUES (?, ?)`
                    const sql = `INSERT INTO skor (skor, user_id) VALUES (?, ?)`



                    pool.query(sql, [result[0].skor, id], (err, result2) => {
                        const sqlState = `INSERT INTO stateSkor (user_id, challange_id, isAnswer) VALUES (?,?,?)`
                        pool.query(sqlState, [id, result[0].id, "true"], (err, resEnd) => {
                            if (err) throw err
                            console.log(id, result[0].id, 'true')
                            console.log("jawaban benar")
                            res.redirect('/challange')
                        })
                    })

                } else {

                    //cek sudah dijawab apa belum
                    const sqlisAnswer = `SELECT * FROM stateSkor WHERE user_id = ? AND challange_id = ?`
                    pool.query(sqlisAnswer, [id, result[0].id], (err, resIsAnswer) => {
                        if (err) throw err
                        if (resIsAnswer.length > 0) {
                            console.log('sudah dijawab')
                            res.redirect('/challange')
                        } else {
                            skorDiDb = skorDiDb + ambilSkor[0].skor + result[0].skor
                            const sql = `UPDATE skor SET skor = ? WHERE user_id = ?`
                            pool.query(sql, [skorDiDb, id], (err, result3) => {
                                const sqlState = `INSERT INTO stateSkor (user_id, challange_id, isAnswer) VALUES (?,?,?)`
                                pool.query(sqlState, [id, result[0].id, "true"], (err, resEnd) => {
                                    if (err) throw err
                                    console.log("jawaban benar")
                                    res.redirect('/challange')
                                })
                            })

                        }

                    })

                }
            })
        } else {
            console.log('jawaban Salah')
            res.redirect('/challange')
        }
    })
}


module.exports = { getAll, getById, cekJawaban }
