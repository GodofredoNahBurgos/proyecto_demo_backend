const express = require('express')
const auth = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/private', auth, (req, res) => {
  res.json({
    message: 'acceso permitido',
    user: req.user
  })
})

module.exports = router