const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.registerUser = async (email, password) => {
  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({ email, password: hashed })
  return user
}

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) return null

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return null

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  return token
}
