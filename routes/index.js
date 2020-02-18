/**
|--------------------------------------------------
| Routes
|--------------------------------------------------
*/
const router = require('express').Router()
const {
  checkAdminAuth
} = require('../middlewares/auth')

/**
|--------------------------------------------------
| Admin
|--------------------------------------------------
*/
const adminController = require('../controllers/admin')
router.post('/admin/create', adminController.create)
router.post('/admin/login', adminController.login)
router.get('/admin/aboutme', checkAdminAuth, adminController.aboutme)

module.exports = router