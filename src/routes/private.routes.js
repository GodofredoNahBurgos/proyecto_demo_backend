const express = require('express')
const auth = require('../middlewares/auth.middleware')
const roleGuard = require('../middlewares/role.middleware')

const router = express.Router()

router.get('/private', auth, (req, res) => {
  res.json({
    message: 'acceso permitido',
    user: req.user
  })
})

router.get('/admin', auth, roleGuard(['admin']) , (req, res) => {
  res.json({
    message: 'acceso admin permitido',
    user: req.user
  })
})

module.exports = router