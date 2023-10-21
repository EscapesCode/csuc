const router = require('express').Router()
const { renderPage,
    renderPageTambah,
    tambahData,
    renderList, hapusData,
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
} = require('../controllers/admin.controller')


router.get('/', renderPage)
router.get('/tambah', renderPageTambah)
router.post('/tambah', tambahData)
router.get('/list', renderList)
router.get('/hapus/:id', hapusData)
router.get('/user/list', renderPagUser)
router.get('/user/tambah', renderPageTambahUser)
router.post('/user/tambah', tambahUser)
router.get('/user/hapus/:id', hapusUser)

router.get('/post/list', renderPost)
router.get('/post/hapus/:id', hapusPost)
router.get('/post/tambah', renderTambahPost)
router.post('/post/tambah', tambahPost)

router.get('/acv/list', renderAcv)
router.get('/acv/hapus/:id', hapusAcv)
router.get('/acv/tambah', renderTambahAcv)
router.post('/acv/tambah', tambahAcv)

module.exports = router

